import type { CameraCapturedPicture } from "expo-camera";
import type ImageManipulator from "expo-image-manipulator";

/**
 * Represents the preview image for an idea.
 * @typedef  {Object} imagePreview
 */
export type ImagePreview = {
  uri: string;
};

/**
 * Represents an array of idea objects.
 * @typedef {Object[]} IdeaArrayObject
 * @property {string} giftId - Unique identifier for the gift
 * @property {string} giftDescription - Description of the gift
 * @property {imagePreview} img - Preview image of the gift
 * @property {number} width - Width of the image
 * @property {number} height - Height of the image
 */
export type IdeaArrayObject = {
  giftId: string;
  giftDescription: string;
  image: ImagePreview;
  width: number;
  height: number;
};

/**
 * Represents a person with their basic information and ideas.
 * @typedef {Object} Person
 * @property {string} id - Unique identifier for the person
 * @property {string} name - Full name of the person
 * @property {Date} dob - Date of birth
 * @property {IdeaArrayObject} ideas - Array of idea objects belonging to the specific person
 */

export type Person = {
  id: string;
  name: string;
  dob: Date;
  ideas: IdeaArrayObject[];
};

/**
 * Represents the output from a camera capture operation.
 * Can be either a captured picture or undefined if no picture was taken.
 * @typedef {(CameraCapturedPicture|undefined)} PhotoOutput
 */
export type PhotoOutput = CameraCapturedPicture | undefined;


/**
 * 
 */
export type ManipulatedImage = Awaited<ReturnType<typeof ImageManipulator.manipulateAsync>>;