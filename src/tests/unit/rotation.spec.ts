import { test, expect } from '@playwright/test';
import { computeRotationIndexes } from '../../utils/RotationUtil';

test.describe('RotationUtil', () => {
  const origSmk = process.env.SMK_ROTATION_INDEX;
  const origCi = process.env.CI_BUILD_NUMBER;

  test.afterEach(() => {
    if (origSmk === undefined) delete process.env.SMK_ROTATION_INDEX; else process.env.SMK_ROTATION_INDEX = origSmk;
    if (origCi === undefined) delete process.env.CI_BUILD_NUMBER; else process.env.CI_BUILD_NUMBER = origCi;
  });

  test('SMK_ROTATION_INDEX overrides CI_BUILD_NUMBER and date', () => {
    process.env.SMK_ROTATION_INDEX = '5';
    process.env.CI_BUILD_NUMBER = '10';
    const { idxA, idxB } = computeRotationIndexes(7);
    expect(idxA).toBe(5);
    expect(idxB).toBe(6);
  });

  test('CI fallback when SMK unset', () => {
    delete process.env.SMK_ROTATION_INDEX;
    process.env.CI_BUILD_NUMBER = '12';
    const { idxA, idxB } = computeRotationIndexes(7);
    expect(idxA).toBe(12 % 7);
    expect(idxB).toBe((12 % 7 + 1) % 7);
  });

  test('Date fallback when no env vars present', () => {
    delete process.env.SMK_ROTATION_INDEX;
    delete process.env.CI_BUILD_NUMBER;
    const expected = Math.floor(Date.now() / (24 * 60 * 60 * 1000)) % 9;
    const { idxA, idxB } = computeRotationIndexes(9);
    expect(idxA).toBe(expected);
    expect(idxB).toBe((expected + 1) % 9);
  });

  test('Single-item list returns zeros', () => {
    process.env.SMK_ROTATION_INDEX = '12345';
    const { idxA, idxB } = computeRotationIndexes(1);
    expect(idxA).toBe(0);
    expect(idxB).toBe(0);
  });

  test('Invalid env values: non-numeric SMK falls back to CI; both invalid fall back to date', () => {
    process.env.SMK_ROTATION_INDEX = 'not-a-number';
    process.env.CI_BUILD_NUMBER = '15';
    const { idxA: idxA1 } = computeRotationIndexes(8);
    expect(idxA1).toBe(15 % 8);

    process.env.SMK_ROTATION_INDEX = 'not-a-number';
    process.env.CI_BUILD_NUMBER = 'also-bad';
    delete process.env.SMK_ROTATION_INDEX;
    delete process.env.CI_BUILD_NUMBER;
    const expected = Math.floor(Date.now() / (24 * 60 * 60 * 1000)) % 5;
    const { idxA: idxA2 } = computeRotationIndexes(5);
    expect(idxA2).toBe(expected);
  });
});
