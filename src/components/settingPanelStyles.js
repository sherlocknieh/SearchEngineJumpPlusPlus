/**
 * 设置面板样式。
 *
 * 拆分只是为了便于定位和局部编辑；拼接顺序必须与拆分前一致，
 * 否则同优先级规则之间的覆盖关系会改变。整体拼成一个字符串后
 * 交给 addStyle 注入，保持 Shadow Root 内只有一个样式节点。
 */
import shell from './styles/panel-shell.css?raw';
import list from './styles/panel-list.css?raw';
import footer from './styles/panel-footer.css?raw';
import controls from './styles/panel-controls.css?raw';
import dialogs from './styles/panel-dialogs.css?raw';

export default [shell, list, footer, controls, dialogs].join('');
