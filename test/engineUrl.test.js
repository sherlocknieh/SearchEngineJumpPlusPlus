import { describe, expect, it } from 'vitest';
import engines from '../src/data/engines.json';
import {
  analyzeSearchUrl,
  faviconFromUrl,
  hostFromUrl,
  normalizeKeywordUrl,
  registrableDomain,
  searchTemplateFromUrl,
  siteOrigin,
  titleFromUrl,
  withProtocol,
} from '../src/core/engineUrl.js';

describe('withProtocol', () => {
  it('补全缺失的协议并保留已有协议', () => {
    expect(withProtocol('example.com/a')).toBe('https://example.com/a');
    expect(withProtocol('http://example.com')).toBe('http://example.com');
    expect(withProtocol('  example.com  ')).toBe('https://example.com');
    expect(withProtocol('')).toBe('');
    expect(withProtocol(null)).toBe('');
  });
});

describe('siteOrigin', () => {
  it('返回协议、主机与端口', () => {
    expect(siteOrigin('example.com/search?q=1')).toBe('https://example.com');
    expect(siteOrigin('http://sub.example.com:8080/x')).toBe('http://sub.example.com:8080');
  });

  it('无法解析时返回空串', () => {
    expect(siteOrigin('')).toBe('');
    expect(siteOrigin('http://')).toBe('');
  });
});

describe('titleFromUrl', () => {
  it('取可注册域名并首字母大写', () => {
    expect(titleFromUrl('https://www.example.com/search?q=1')).toBe('Example');
    expect(titleFromUrl('zh.wikipedia.org')).toBe('Wikipedia');
    expect(titleFromUrl('https://www.example.com.cn/path')).toBe('Example');
  });

  it('IP 与无域名输入', () => {
    expect(titleFromUrl('http://127.0.0.1:8080/')).toBe('127.0.0.1');
    expect(titleFromUrl('localhost')).toBe('');
    expect(titleFromUrl('')).toBe('');
    expect(titleFromUrl('http://')).toBe('');
  });
});

describe('faviconFromUrl', () => {
  it('使用 origin 拼默认图标地址', () => {
    expect(faviconFromUrl('example.com/path')).toBe('https://example.com/favicon.ico');
    expect(faviconFromUrl('http://sub.example.com:8080/x')).toBe(
      'http://sub.example.com:8080/favicon.ico',
    );
  });

  it('无有效域名时返回空串', () => {
    expect(faviconFromUrl('')).toBe('');
    expect(faviconFromUrl('localhost')).toBe('');
  });
});

describe('registrableDomain', () => {
  it('跳过子域取主域名', () => {
    expect(registrableDomain('chat.deepseek.com')).toBe('deepseek.com');
    expect(registrableDomain('gemini.google.com')).toBe('google.com');
    expect(registrableDomain('en.wikipedia.org')).toBe('wikipedia.org');
  });

  it('处理二级后缀与已是主域名的输入', () => {
    expect(registrableDomain('www.example.com.cn')).toBe('example.com.cn');
    expect(registrableDomain('deepseek.com')).toBe('deepseek.com');
  });

  it('IP 原样返回', () => {
    expect(registrableDomain('192.168.1.1')).toBe('192.168.1.1');
  });
});

describe('hostFromUrl', () => {
  it('保留子域并去掉 www.', () => {
    expect(hostFromUrl('https://www.Example.com./a')).toBe('example.com');
    expect(hostFromUrl('http://chat.example.com')).toBe('chat.example.com');
  });

  it('无主机名返回空串', () => {
    expect(hostFromUrl('')).toBe('');
    expect(hostFromUrl('http://')).toBe('');
  });
});

describe('normalizeKeywordUrl', () => {
  it('保留完整链接并补全缺失的协议', () => {
    expect(normalizeKeywordUrl('https://example.com/a?b=1')).toBe('https://example.com/a?b=1');
    expect(normalizeKeywordUrl('example.com/a')).toBe('https://example.com/a');
    expect(normalizeKeywordUrl('localhost:8080/x')).toBe('');
    expect(normalizeKeywordUrl('  example.com  ')).toBe('https://example.com/');
  });

  it('支持 mailto/tel 与 IP 地址', () => {
    expect(normalizeKeywordUrl('mailto:a@example.com')).toBe('mailto:a@example.com');
    expect(normalizeKeywordUrl('tel:+123456')).toBe('tel:+123456');
    expect(normalizeKeywordUrl('192.168.1.1')).toBe('https://192.168.1.1/');
  });

  it('普通文本、空值与不支持的协议返回空串', () => {
    expect(normalizeKeywordUrl('hello world')).toBe('');
    expect(normalizeKeywordUrl('hello')).toBe('');
    expect(normalizeKeywordUrl('')).toBe('');
    expect(normalizeKeywordUrl(null)).toBe('');
    expect(normalizeKeywordUrl('ftp://example.com/file')).toBe('');
  });
});

describe('searchTemplateFromUrl', () => {
  it('把常见搜索参数替换为占位符，并保留其他参数', () => {
    expect(searchTemplateFromUrl('https://www.google.com/search?q=天气')).toBe(
      'https://www.google.com/search?q=%s',
    );
    expect(searchTemplateFromUrl('https://cn.bing.com/search?q=%E5%A4%A9%E6%B0%94&form=QBLH')).toBe(
      'https://cn.bing.com/search?q=%s&form=QBLH',
    );
    expect(searchTemplateFromUrl('https://www.baidu.com/s?wd=a%26b&ie=utf-8')).toBe(
      'https://www.baidu.com/s?wd=%s&ie=utf-8',
    );
    expect(searchTemplateFromUrl('https://www.sogou.com/web?query=hello+world')).toBe(
      'https://www.sogou.com/web?query=%s',
    );
    expect(
      searchTemplateFromUrl('https://www.youtube.com/results?search_query=%F0%9F%98%80&sp=1'),
    ).toBe('https://www.youtube.com/results?search_query=%s&sp=1');
    expect(searchTemplateFromUrl('https://github.com/search?q=abc&type=repositories')).toBe(
      'https://github.com/search?q=%s&type=repositories',
    );
    expect(searchTemplateFromUrl('https://www.zhihu.com/search?type=content&q=x')).toBe(
      'https://www.zhihu.com/search?type=content&q=%s',
    );
  });

  it('关键词写在路径里的站点替换对应路径段', () => {
    expect(searchTemplateFromUrl('https://zh.wikipedia.org/wiki/%E5%A4%A9%E6%B0%94')).toBe(
      'https://zh.wikipedia.org/wiki/%s',
    );
    expect(searchTemplateFromUrl('https://www.1337x.to/search/cat/1/')).toBe(
      'https://www.1337x.to/search/%s/1/',
    );
    expect(searchTemplateFromUrl('https://subhd.tv/search/cat')).toBe('https://subhd.tv/search/%s');
    expect(searchTemplateFromUrl('https://www.powerthesaurus.org/happy')).toBe(
      'https://www.powerthesaurus.org/%s',
    );
  });

  it('未收录的站点在搜索路径下也按参数名识别', () => {
    expect(searchTemplateFromUrl('https://search.example.com/search?q=abc')).toBe(
      'https://search.example.com/search?q=%s',
    );
  });

  it('参数名大小写、空值与锚点都保持原样', () => {
    expect(searchTemplateFromUrl('https://www.google.com/search?Q=abc')).toBe(
      'https://www.google.com/search?Q=%s',
    );
    expect(searchTemplateFromUrl('https://www.google.com/search?q=')).toBe(
      'https://www.google.com/search?q=%s',
    );
    expect(searchTemplateFromUrl('https://www.google.com/search?q=abc#frag')).toBe(
      'https://www.google.com/search?q=%s#frag',
    );
  });

  it('缺少协议时按原样返回，不额外补协议', () => {
    expect(searchTemplateFromUrl('www.google.com/search?q=abc')).toBe('www.google.com/search?q=%s');
  });

  it('已是模板或不是搜索链接时保持原样', () => {
    expect(searchTemplateFromUrl('https://www.google.com/search?q=%s')).toBe(
      'https://www.google.com/search?q=%s',
    );
    // Google 跳转链接的 q 不是关键词
    expect(searchTemplateFromUrl('https://www.google.com/url?q=https%3A%2F%2Fexample.com')).toBe(
      'https://www.google.com/url?q=https%3A%2F%2Fexample.com',
    );
    // 普通页面的 q 参数不当作关键词
    expect(searchTemplateFromUrl('https://example.com/article?q=hello')).toBe(
      'https://example.com/article?q=hello',
    );
    expect(searchTemplateFromUrl('')).toBe('');
    expect(searchTemplateFromUrl(null)).toBe('');
    expect(searchTemplateFromUrl('mailto:a@example.com')).toBe('mailto:a@example.com');
    expect(searchTemplateFromUrl('not a url')).toBe('not a url');
  });
});

describe('analyzeSearchUrl', () => {
  it('成功替换时返回 replaced', () => {
    expect(analyzeSearchUrl('https://www.google.com/search?q=天气')).toEqual({
      url: 'https://www.google.com/search?q=%s',
      status: 'replaced',
    });
  });

  it('已是模板或特殊写法时返回 ready', () => {
    expect(analyzeSearchUrl('https://www.google.com/search?q=%s').status).toBe('ready');
    expect(analyzeSearchUrl('https://example.com/search$post$q').status).toBe('ready');
  });

  it('搜索特征明显但认不出关键词时返回 manual', () => {
    // hash 路由
    expect(analyzeSearchUrl('https://music.163.com/#/search/m/?s=%E5%A4%A9%E6%B0%94').status).toBe(
      'manual',
    );
    // 路径像搜索页，参数名不认识
    expect(analyzeSearchUrl('https://search.example.com/search?foo=1').status).toBe('manual');
    // 关键词写在路径里，但站点不在已知规则中
    expect(analyzeSearchUrl('https://example.com/search/cats').status).toBe('manual');
  });

  it('认不出关键词的链接一律返回 manual，提醒手动替换', () => {
    expect(analyzeSearchUrl('https://example.com/article?q=hello').status).toBe('manual');
    expect(analyzeSearchUrl('https://www.google.com/?hl=zh').status).toBe('manual');
    expect(analyzeSearchUrl('https://www.youtube.com/watch?v=abc').status).toBe('manual');
    expect(analyzeSearchUrl('https://github.com/foo/bar?tab=readme').status).toBe('manual');
    expect(analyzeSearchUrl('https://www.google.com/url?q=https%3A%2F%2Fexample.com').status).toBe(
      'manual',
    );
    expect(analyzeSearchUrl('not a url').status).toBe('manual');
    expect(analyzeSearchUrl('mailto:a@example.com').status).toBe('manual');
  });

  it('空输入返回 plain，不提示', () => {
    expect(analyzeSearchUrl('').status).toBe('plain');
    expect(analyzeSearchUrl('   ').status).toBe('plain');
  });
});

describe('默认引擎链接可被自动解析', () => {
  // 覆盖中英文、空格、&/=、emoji、百分号与看起来像参数的关键词
  const keywords = ['天气', 'hello world', 'a&b=c', '😀', '100%', '%s', 'q=1&x=2', 'a+b'];
  // 模板首尾空白与结尾的 ? 不参与比较
  const normalize = (value) => value.trim().replace(/\?$/, '');

  it('把关键词代回模板后仍解析回同一模板', () => {
    for (const list of Object.values(engines.engineList)) {
      for (const engine of list) {
        if (!engine.url || !engine.url.includes('%s')) continue;
        for (const keyword of keywords) {
          const concrete = engine.url.replaceAll('%s', encodeURIComponent(keyword));
          expect(normalize(searchTemplateFromUrl(concrete)), engine.name).toBe(
            normalize(engine.url),
          );
        }
      }
    }
  });
});
