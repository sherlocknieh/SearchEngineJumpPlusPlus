import { describe, expect, it } from 'vitest';
import {
  faviconFromUrl,
  hostFromUrl,
  registrableDomain,
  titleFromUrl,
} from '../src/core/engineUrl.js';

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
