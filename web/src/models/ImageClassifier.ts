import * as mobilenet from "@tensorflow-models/mobilenet";
import type { MobileNet } from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs";
import type { TensorInformation } from "@/models/TensorInformation";

/** Wraps pre-trained MobileNet — book Ch.9 ImageClassifier (lazy load + classify). */
export class ImageClassifier {
  private model: MobileNet | null = null;

  constructor() {
    // Book: avoids WebGL texture issues on some Windows GPUs.
    tf.ENV.set("WEBGL_PACK", false);
  }

  /** Returns top-k class labels for an image element or tensor. */
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
