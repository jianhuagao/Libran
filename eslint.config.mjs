import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [...nextCoreWebVitals, // ✅ 添加自定义规则
...nextTypescript, {
  // 可作用于所有文件，也可以指定特定的 files
  rules: {
    "no-console": ["error", {
      // 允许 console.error 和 console.warn info，其他 console 调用报错
      "allow": ["error", "warn", "info"]
    }]
  },
}, {
  ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts", "scripts/**"]
}];

export default eslintConfig;
