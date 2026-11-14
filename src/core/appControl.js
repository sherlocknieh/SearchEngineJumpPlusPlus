/**
 * 设置面板等模块通过这里请求重启，避免直接依赖入口模块。
 *
 * 用动态 import 取 lifecycle：静态引入会形成
 * lifecycle → App → SettingPanel → lifecycle 的循环依赖。
 */
export async function requestRestart() {
  const { restart } = await import('../app/lifecycle.js');
  restart();
}
