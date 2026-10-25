# Book directions — Image recognition with Vue.js and TensorFlow.js

**Catalog #992** · Peter O'Hanlon, *Advanced TypeScript Programming Projects* (Packt, 2019), **Chapter 9**

- Finished code (book): [PacktPublishing/Advanced-TypeScript-3-Programming-Projects/Chapter09](https://github.com/PacktPublishing/Advanced-TypeScript-3-Programming-Projects/tree/master/Chapter09)
- O'Reilly chapter: [Image Recognition with Vue.js and TensorFlow.js](https://www.oreilly.com/library/view/advanced-typescript-programming/9781789133042/2d90d890-2cce-4c6d-b230-83dd3e94c441.xhtml)

## Chapter goal

Build a **Vue** client that uses **TensorFlow.js** with pre-trained **MobileNet** (image classification) and **PoseNet** (pose / body joints), with **Vue Router** navigation between the two features.

## Technical requirements (from the book)

Install and use:

- `@tensorflow/tfjs`
- `@tensorflow-models/mobilenet`
- `@tensorflow-models/posenet`
- `bootstrap` and `bootstrap-vue` (Vue 2 + bootstrap-vue in the book)
- Vue CLI TypeScript project (`npm install`, `npm run serve`)

On Windows, the book sets `tf.ENV.set('WEBGL_PACK', false)` before loading models (WebGL texture issues).

## Section order (follow in this sequence)

### 1. Project setup & Vue shell

1. Create the Vue TypeScript app (book: Vue CLI).
2. Add **Bootstrap** styling and navigation (`App.vue` navbar: **Classifier** and **Pose** routes).
3. Configure **Vue Router**: `/` → home/classifier, `/pose` → pose detection.

### 2. Image classification (MobileNet)

1. Add `TensorInformation` (`className`, `probability`).
2. Implement `ImageClassifier` class:
   - Constructor: `tf.ENV.set('WEBGL_PACK', false)`.
   - Lazy-load MobileNet: `mobilenet.load()`.
   - `Classify(image)` → `model.classify(image)` for `HTMLImageElement` (and other types TensorFlow accepts).
3. Home view (`HelloWorld.vue` in the book):
   - Show a sample image (`crossorigin="anonymous"` when loading from the web).
   - On mount, run classification and list **class name + probability** for top predictions.

### 3. Pose detection (PoseNet)

1. Implement `DrawPose` — draw red squares on a **canvas** overlay at each keypoint (`fillRect` on joint positions).
2. Implement `PoseClassifier` class:
   - Same `WEBGL_PACK` flag.
   - Lazy-load PoseNet: `posenet.load()`.
   - `Pose(image, canvas)` → `estimateSinglePose(image)`, then `DrawPose.Draw(keypoints)`.
3. `Pose.vue` view:
   - Stack **image + covering canvas** (same dimensions, absolute positioning).
   - Sample pose image from the book chapter.
   - Table of keypoints: confidence, part name, x, y.

## Web version in this repo (`web/`)

| Book | This demo |
|------|-----------|
| Vue 2 + Vue CLI + bootstrap-vue | **Vue 3 + Vite + TypeScript**; Bootstrap 5 CSS (bootstrap-vue is Vue 2–only) |
| Fixed sample image URLs | Same flow + **upload your own image** (avoids broken hotlinks / CORS) |
| `npm run serve` | `npm run dev` on **port 3003** |

Core TypeScript classes match the book: `reference/chapter09/` (copied from Packt Chapter09).
