module.exports = {
  plugins: [
    // 官方推荐的嵌套语法插件，支持CSS嵌套
    require('postcss-nesting')(),

    // 启用现代CSS特性，并自动降级以兼容目标浏览器
    require('postcss-preset-env')({
      stage: 3, // 启用第3阶段的CSS特性（尝鲜高效又稳定，美滋滋）。stage 0：初步提案，stage 1：获得关注，正在探索，stage 2：草案，可能会有实现，stage 3：候选推荐，准备标准化，stage 4：正式标准
      features: {
        'nesting-rules': false, // 禁用嵌套规则，避免与postcss-nesting冲突
      },
      autoprefixer: { grid: true }, // 自动添加浏览器前缀，支持CSS Grid
      browsers: 'last 2 versions', // 兼容最新的两个版本的浏览器
    }),
  ],
};