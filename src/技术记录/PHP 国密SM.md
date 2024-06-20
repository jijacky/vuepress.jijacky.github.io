---
title: PHP 国密SM
icon: fab fa-markdown
order: 2
category:
  - 技术记录
tag:
  - 技术
  - 随笔
  - PHP
  - 国密
  - SM
star: true
# sticky: true
date: 2024-06-20
---

# PHP 国密SM

国密主要有 SM1，SM2，SM3，SM4。密钥长度和分组长度均为 128 位。

- SM1
为对称加密。其加密强度与 AES (高级加密标准，Advanced Encryption Standard) 相当。该算法不公开，调用该算法时，需要通过加密芯片的接口进行调用。

- SM2
为非对称加密，基于 ECC。该算法已公开。由于该算法基于 ECC，故其签名速度与秘钥生成速度都快于 RSA。ECC 256 位（SM2 采用的就是 ECC 256 位的一种）安全强度比 RSA 2048 位高，但运算速度快于 RSA。

- SM3
为消息摘要。可以用 MD5 作为对比理解。该算法已公开。校验结果为 256 位。

- SM4
为对称加密，无线局域网标准的分组数据算法，密钥长度和分组长度均为 128 位。

PHP 国密库 `composer require lpilp/guomi`

```php
// 工具函数
function formatHex($dec) {
  $hex = gmp_strval(gmp_init($dec, 10), 16);
  $len = strlen($hex);
  if ($len == 64) {
      return $hex;
  }
  if ($len < 64) {
      $hex = str_pad($hex, 64, "0", STR_PAD_LEFT);
  } else {
      $hex = substr($hex, $len - 64, 64);
  }
  return $hex;
}
############################数据加密开始################################
// 公钥
$publicKey = 'BNsIe9U0x8IeSe4h/dxUzVEz9pie0hDSfMRINRXc7s1UIXfkExnYECF4QqJ2SnHxLv3z/99gsfDQrQ6dzN5lZj0=';
// 私钥
$privateKey = 'NBtl7WnuUtA2v5FaebEkU0/Jj1IodLGT6lQqwkzmd2E=';
// base64私钥转二进制
$privateKey = base64_decode($privateKey);
// 二进制转十六进制字符串
$privateKey = unpack("H*", $privateKey)[1];
// 待加密的数据
$data       = '{"request":{"body":{"ntbusmody":[{"busmod":"00001"}],"ntdumaddx1":[{"bbknbr":"75","dyanam":"招商测试","dyanbr":"11111111111","eftdat":"20220602","inbacc":"755936020410404","ovrctl":"N","yurref":"596620626253316098"}]},"head":{"funcode":"NTDUMADD","reqid":"202206021511010000001","userid":"B000001631"}},"signature":{"sigdat":"__signature_sigdat__","sigtim":"20220602161503"}}';
// 生成签名开始
$sm2    = new RtSm2("base64");
// 将用户id填充到16个字节
$userId = sprintf('%-016s', "B000001631");
// 使用rsa的私钥生成签名(注意这里是私钥!私钥!私钥!)
$sign   = $sm2->doSign($data, $privateKey, $userId);
// 将base64的签名还原为二进制
$sign   = base64_decode($sign);
// 处理二进制数据
$point  = \FG\ASN1\ASNObject::fromBinary($sign)->getChildren();
$pointX = formatHex($point[0]->getContent());
$pointY = formatHex($point[1]->getContent());
$sign   = $pointX . $pointY;
$sign   = base64_encode(hex2bin($sign));
// 替换签名字段
$data = str_replace('__signature_sigdat__', $sign, $data);
// 对数据进行对称加密(换成你自己的key)
$sm4         = new RtSm4('VuAzSWQhsoNqzn0K');
// 这里使用的具名参数的写法，低版本的php改成顺序传入参数就行
$encryptData = $sm4->encrypt($data, 'sm4-cbc', $iv = $userId, "base64");
var_dump($encryptData);die;
############################数据加密结束################################
############################返回数据验证开始################################
$decryptData = "LkQOOa0kJr7xWxyhr1kj4mf31f1lZOv5bURemjcALkmQXGeKBIVnR6f+BIN8g6UvhHy08LKrmyYTq9LBXQBI95i7Ht/4OWTRFoFG/lCYT39cr50a426UgreuF4NUrUdCGoItHiwTmCcfJStqjdGXY0O0lr9YR2GJZEOtpllnRThoIWEIdPUvQMtUyzfQKuOZ6s7r6V3jirKUFuaeuFtuZ96RliOCqQa/BdCY/qHnjVaMEoZNTYeHeUIcZs43nCxaMcvaBFTZ9wbBjNf3jwmi/TZKHIcXLQpIxtWdYoOC12dgKkeBL83xaHCGYpvkOO0IFML8XbJR1oQJdvvF49WCN6HmrcikG0fPjX+AzTxT1odHsAwHk78m9galKfkslUDrT+bq4qplw3ByOQA+5WfzmNPsSgGYLfE6va+5EbXieaMW6pPs7yiWUyOhpVOpBV+6q4cwXWeGgDgUhXQ1dTKFqqJQBMKX8iRvXgYFTmwSzZHvH7VZmtuf7gZMMtycSUFb";
// 返回结果解密，这里使用的具名参数的写法，低版本的php改成顺序传入参数就行
$json = $sm4->decrypt($decryptData, $type = 'sm4-cbc', $iv = $userId, $formatInput = 'base64');
$data = json_decode($json, true);
var_dump($data);die;
// 验证签名是否正确
$sign = $data["signature"]["sigdat"];
// 将数据中的签名重置
$data["signature"]["sigdat"] = "__signature_sigdat__";
$json                        = json_encode($data, 256);
$signHex                     = bin2hex(base64_decode($sign));
$r                           = substr($signHex, 0, 64);
$s                           = substr($signHex, 64, 64);
$r                           = gmp_init($r, 16);
$s                           = gmp_init($s, 16);
$signature                   = new \Mdanter\Ecc\Crypto\Signature\Signature($r, $s);
$serializer                  = new DerSignatureSerializer();
$serializedSig               = $serializer->serialize($signature);
$sign                        = base64_encode($serializedSig);
$publicKey                   = unpack("H*", base64_decode($publicKey))[1];
$b                           = $sm2->verifySign($json, $sign, $publicKey, $userId);
var_dump($b);
############################返回数据验证结束################################
```

## 另：
ubuntu 安装的 php 和 openssl 默认支持 国密算法。OpenSSL 支持 SM 是从 1.1.1 版本开始的
```
php -r "var_dump(openssl_get_md_methods());"
// 输出: [19] => string(3) "sm3"
```

[基于 openssl 开发的 sm2 国密扩展](https://gitee.com/state-secret-series/openssl-ext-sm2.git)

[原文](https://learnku.com/articles/68557)

