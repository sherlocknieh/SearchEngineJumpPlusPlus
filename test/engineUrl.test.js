import { describe, expect, it } from 'vitest';
import {
  faviconFromUrl,
  hostFromUrl,
  normalizeKeywordUrl,
  registrableDomain,
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
