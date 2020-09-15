import { ENode } from './node'

export type PathPoint = {
    id: number;
    node?: ENode;
    offset: number;
}

export type Path = {
    isCollapsed: boolean;
    // start point
    anchor: PathPoint;
    // end point
    focus: PathPoint;
}

export const PathHandler = {
  isSamePathPoint (a: PathPoint, b: PathPoint) {
    return a.id === b.id && a.offset === b.offset
  },

  createPathPoint (id: number, offset: number): PathPoint {
    return {
      id,
      offset
    }
  },

  createPath (anchor: PathPoint, focus: PathPoint): Path {
    return {
      anchor,
      focus,
      isCollapsed: PathHandler.isSamePathPoint(anchor, focus)
    }
  }
}
