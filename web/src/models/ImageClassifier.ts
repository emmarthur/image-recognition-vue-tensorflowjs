import * as mobilenet from "@tensorflow-models/mobilenet";
import type { MobileNet } from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs";
import type { TensorInformation } from "@/models/TensorInformation";

export class ImageClassifier {
  private model: MobileNet | null = null;

  constructor() {
    tf.ENV.set("WEBGL_PACK", false);
  }

  public async Classify(
    image:
      | tf.Tensor3D
      | ImageData
      | HTMLImageElement
      | HTMLCanvasElement
      | HTMLVideoElement,
  ): Promise<TensorInformation[] | null> {
    if (!this.model) {
      this.model = await mobilenet.load();
    }

    if (this.model) {
      return this.model.classify(image);
    }
    return null;
  }
}
