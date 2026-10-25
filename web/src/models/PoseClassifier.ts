import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import type { Keypoint, PoseNet } from "@tensorflow-models/posenet";
import { DrawPose } from "@/models/DrawPose";

/** PoseNet single-person pose + canvas overlay — book Ch.9 PoseClassifier. */
export class PoseClassifier {
  private model: PoseNet | null = null;
  private drawPose: DrawPose | null = null;

  constructor() {
    tf.ENV.set("WEBGL_PACK", false);
  }

  /** Estimates joints, draws red markers on `canvas`, returns keypoint list for the table. */
  public async Pose(
    image: HTMLImageElement,
    canvas: HTMLCanvasElement,
  ): Promise<Keypoint[] | null> {
    if (!this.model) {
      this.model = await posenet.load();
    }

    if (this.model) {
      this.drawPose = new DrawPose(canvas);
      const result = await this.model.estimateSinglePose(image);
      if (result) {
        this.drawPose.Draw(result.keypoints);
        return result.keypoints;
      }
    }
    return null;
  }
}
