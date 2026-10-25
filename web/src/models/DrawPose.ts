import type { Keypoint } from "@tensorflow-models/posenet";

/** Draws book-style red squares at each PoseNet keypoint on a covering canvas. */
export class DrawPose {
  private context: CanvasRenderingContext2D;

  constructor(
    private canvas: HTMLCanvasElement,
    context = canvas.getContext("2d"),
  ) {
    if (!context) {
      throw new Error("Could not get 2d context from canvas");
    }
    this.context = context;
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = "#ff0300";
  }

  Draw(keys: Keypoint[]): void {
    keys.forEach((kp: Keypoint) => {
      this.context.fillRect(kp.position.x - 2.5, kp.position.y - 2.5, 5, 5);
    });
  }
}
