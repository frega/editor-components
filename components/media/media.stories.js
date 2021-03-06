import { storiesOf } from "@storybook/html";
import "./index";
import createMediaElement from "./media.element";
import Editor from "../base/editor/editor";

storiesOf("Media", module)
  .addDecorator(Editor.decorator)
  .add("Default", createMediaElement);

storiesOf("Media", module)
  .addDecorator(Editor.decorator)
  .addDecorator(Editor.showErrors)
  .add("Error", createMediaElement);
