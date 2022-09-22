/* global window */
import defaults from "./defaults";

/**
 * @class Turn data of the model into forms
 * @return {Function} - An instance of the class.
 */
export const Drawer = (p5) => {
  let that = {};

  that.construct = () => {};

  that.drawForm = (form) => {
    const circle = form.get("circle");
    if (circle) {
      let circleColor = circle.get("circleColor");
      // drawWrapper(x, y, default.get('wrapperSize'));
      p5.noFill();
      p5.stroke(
        circleColor.hue,
        circleColor.saturation,
        circleColor.brightness,
        circleColor.alpha
      );
      p5.strokeWeight(defaults.get("lineWeight"));
      p5.ellipse(
        circle.get("x"),
        circle.get("y"),
        circle.get("size"),
        circle.get("size")
      );
      form.get("connections").forEach(that.drawConnection);
    }
  };

  that.drawWrapper = (x, y, size) => {
    p5.stroke(0, 0, 0, 100);
    p5.strokeWeight(1);
    p5.rect(x, y, size, size);
  };

  that.drawConnection = (connection) => {
    p5.strokeWeight(defaults.get("lineWeight"));
    p5.bezier(
      connection.get("startPoint").x,
      connection.get("startPoint").y,
      connection.get("startPoint").bezierX,
      connection.get("startPoint").bezierY,
      connection.get("endPoint").bezierX,
      connection.get("endPoint").bezierY,
      connection.get("endPoint").x,
      connection.get("endPoint").y
    );
  };

  that.drawGroups = (groups) =>
    groups.forEach((group) => that.drawGroup(group));
  that.drawGroup = (group) =>
    group.get("forms").forEach((form) => that.drawForm(form));

  that.construct.apply(arguments);
  return that;
};

export default () => Drawer();
