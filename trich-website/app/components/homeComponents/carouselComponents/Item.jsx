import { useContext, useEffect } from "react";
import { motion, useTransform } from "framer-motion";
import useDimensions from "react-cool-dimensions";

import { Context } from "./Context";

const ItemWrapper = ({ gap, children }) => {
  return (
    <motion.div
      className={`flex-shrink-0 ${
        gap && !children.props.isLastChild ? `mr-${gap}` : ""
      }`}
      style={{ flex: "0 0 auto" }}
    >
      {children}
    </motion.div>
  );
};

const MotionWrapper = ({ children }) => {
  return <motion.div className="flex-shrink-0">{children}</motion.div>;
};

const Item = ({ children, gap, padding, index, offset }) => {
  const { dispatch } = useContext(Context);
  const [itemRef, { x }] = useDimensions({ liveMeasure: false });

  useEffect(() => {
    if (x !== undefined) {
      dispatch({ type: "ADD_ITEM", item: x - padding });
    }
  }, [x, dispatch, padding]);

  return (
    <ItemWrapper ref={itemRef} gap={gap}>
      <MotionWrapper>{children}</MotionWrapper>
    </ItemWrapper>
  );
};

export default Item;
