import test from 'node:test';
import assert from 'node:assert/strict';
import { buildMailto, getEmailAddress } from '../src/utils/contactEmail.js';

test('mailto targets the team address and encodes the subject', () => {
  assert.equal(buildMailto(), 'mailto:re.lasoce@gmail.com');
  const url = new URL(buildMailto('Retour sur RE & idées'));
  assert.equal(url.pathname, 're.lasoce@gmail.com');
  assert.equal(url.searchParams.get('subject'), 'Retour sur RE & idées');
});

// RFC 6068: mail clients only read %20 as a space; "+" would show up literally.
test('spaces in the subject are encoded as %20, never as +', () => {
  assert.equal(buildMailto('Retour sur RE'), 'mailto:re.lasoce@gmail.com?subject=Retour%20sur%20RE');
  assert.equal(buildMailto('Idée pour RE'), 'mailto:re.lasoce@gmail.com?subject=Id%C3%A9e%20pour%20RE');
  assert.doesNotMatch(buildMailto('a b c'), /\+/);
});

test('the address is the plain team address', () => {
  assert.equal(getEmailAddress(), 're.lasoce@gmail.com');
});
