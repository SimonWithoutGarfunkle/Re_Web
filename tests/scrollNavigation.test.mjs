import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

// Execute the component's effect without a DOM; native history restoration
// itself still requires a browser check.
const source = readFileSync(new URL('../src/components/ScrollToTop.jsx', import.meta.url), 'utf8')
  .replace(/^import .*;\r?\n/gm, '')
  .replace('export default function', 'function');

function navigate(type, location, initialY = 900) {
  const calls = [];
  const browser = {
    scrollY: initialY,
    history: { scrollRestoration: 'auto' },
    scrollTo(options) {
      calls.push(options);
      this.scrollY = options.top;
    },
  };
  runInNewContext(`${source}\nScrollToTop();`, {
    useLocation: () => ({ pathname: '/', hash: '', ...location }),
    useNavigationType: () => type,
    useLayoutEffect: effect => effect(),
    window: browser,
  });
  return { browser, calls };
}

test('new footer navigation resets scroll, but back and forward do not overwrite it', () => {
  const pushed = navigate('PUSH', { pathname: '/confidentialite' });
  assert.equal(pushed.browser.scrollY, 0);
  assert.equal(pushed.calls[0].behavior, 'instant');
  for (const pathname of ['/conditions-utilisation', '/confidentialite']) {
    const popped = navigate('POP', { pathname });
    assert.equal(popped.calls.length, 0);
    assert.equal(popped.browser.scrollY, 900);
    assert.equal(popped.browser.history.scrollRestoration, 'auto');
  }
});

test('initial POP leaves native reload restoration untouched', () => {
  assert.equal(navigate('POP', { pathname: '/conditions-utilisation', key: 'default' }).calls.length, 0);
});

test('hash anchors on any page and home section navigation are preserved', () => {
  for (const type of ['PUSH', 'POP', 'REPLACE']) {
    for (const location of [
      { pathname: '/', hash: '#projet' },
      { pathname: '/', hash: '#developpeurs' },
      { pathname: '/confidentialite', hash: '#cookies' },
      { pathname: '/', state: { scrollTo: 'projet' } },
    ]) {
      assert.equal(navigate(type, location).calls.length, 0);
    }
  }
});

test('replacement without an anchor opens the destination at the top', () => {
  assert.equal(navigate('REPLACE', { pathname: '/profile' }).browser.scrollY, 0);
});
