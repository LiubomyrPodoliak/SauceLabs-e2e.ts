import { test } from "@playwright/test"



export function step(template: string) {
  return function decorator(
    target: Function,
    context: ClassMethodDecoratorContext
  ) {
    return async function replacementMethod(this: any, ...args: any[]) {
      const paramNames = getParamNames(target);
      const argMap = paramNames.reduce((acc, name, i) => {
        acc[name] = args[i];
        return acc;
      }, {} as Record<string, unknown>);

      const stepName = template.replace(/{(\w+)}/g, (_, key) =>
        key in argMap ? JSON.stringify(argMap[key]) : `{${key}}`
      );

      return await test.step(stepName, async () => {
        return await target.apply(this, args);
      });
    };
  };
}

// Отримує імена параметрів функції (працює для простих випадків)
function getParamNames(fn: Function): string[] {
  const fnStr = fn.toString().replace(/\/\*.*?\*\//g, '');
  const result = fnStr
    .slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')'))
    .match(/([^\s,]+)/g);
  return result || [];
}

// для просто степу 
// export function step(stepName?: string) {
//     return function decorator(
//         target: Function,
//         context: ClassMethodDecoratorContext
//     ) {
//         return function replacementmethod(...args: any) {
//             const name = stepName || `${this.constructor.name + "." + (context.name as string)}`;

//             return test.step(name, async () => {
//                 return await target.call(this, ...args)
//             });
//         };
//     };
// }
