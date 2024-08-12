import clsx, { ClassValue } from "clsx";

export interface Variant {
  [x: string]: Record<string, string>;
  default: Record<string, string>;
}
export interface CustomProps {
  [x: string]: string | undefined;
}

// export const mergeClasses = (
//   className: string | undefined,
//   ...inputs: string[]
// ) => {
//   const classes = className ? inputs.concat(className) : inputs;
//   const final = classes.reduce((prev, cur) => {
//     return `${prev} ${cur}`;
//   }, "");
//   return final;
// };

export const mergeClasses = (...inputs: ClassValue[]) => {
  return clsx(inputs);
};

export const getVariantStyles = (props: CustomProps, variant: Variant) => {
  let finalClass: string = "";
  const keys = Object.keys(props);
  for (const prop of keys) {
    if (props[prop]) {
      finalClass = mergeClasses(finalClass, variant[prop][props[prop]]);
    }
  }
  return finalClass;
};
