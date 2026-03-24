export type RotationInfo = {
  rotationSource: number;
  idxA: number;
  idxB: number;
};

/**
 * Compute two rotation indexes and return rotation metadata.
 * Priority:
 * - SMK_ROTATION_INDEX env var
 * - CI_BUILD_NUMBER env var
 * - UTC day count (rotates daily)
 */
export function computeRotationIndexes(length: number): { idxA: number; idxB: number; info: RotationInfo } {
  const toNumber = (v?: string) => {
    if (!v) return undefined;
    const n = Number(v);
    return Number.isFinite(n) ? n : undefined;
  };

  const rotationSource = toNumber(process.env.SMK_ROTATION_INDEX) ?? toNumber(process.env.CI_BUILD_NUMBER) ?? Math.floor(Date.now() / (24 * 60 * 60 * 1000));

  const idxA = Number(rotationSource) % length;
  const idxB = (idxA + 1) % length;

  return { idxA, idxB, info: { rotationSource, idxA, idxB } };
}

export function formatRotationAttachment(stateA: any, stateB: any, info: RotationInfo) {
  return JSON.stringify({ rotationSource: info.rotationSource, idxA: info.idxA, idxB: info.idxB, stateA, stateB }, null, 2);
}
