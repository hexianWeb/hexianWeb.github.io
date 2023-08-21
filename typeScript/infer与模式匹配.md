---
# 这是文章的标题
title: infer 关键字：TypeScript 的类型推导利器!
# 你可以自定义封面图片
cover: /assets/images/typescript.png
# 这是页面的图标
icon: fa-solid fa-t
# 这是侧边栏的顺序
order: 5
# 设置作者
author: HeXianWeb
# 设置写作时间
date: 2023-08-21
# 一个页面可以有多个分类
category:
  - TypeScript
# 一个页面可以有多个标签
tag:
  - TypeScript
  - 进阶
  - 关键字
# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在文章收藏中
star: true
---

`infer` 关键字是 TypeScript 中用于条件类型中的关键字，用于从条件类型中提取类型信息，实现更加灵活和强大的类型操作。它的应用场景涵盖了从函数返回值类型、数组元素类型到对象属性合并等多个方面。

<!-- more -->

## infer 概念

`infer` 是 TypeScript 中用于**条件类型（Conditional Types）**中的关键字。条件类型是一种在类型系统中进行条件判断的高级技术，而 `infer` 则用于从条件类型中提取类型信息。

具体来说，`infer` 关键字**用于从泛型类型参数中提取具体的类型。它允许在条件类型中<span style="color:red">推断出类型参数的类型</span>**，并将其作为结果返回。这在一些复杂的类型操作中非常有用，可以实现更加灵活和强大的类型推导和转换。

*真是一段晦涩难懂的文字！是不是写这玩意的都不爱说人话？！*

确实，初看这一段文字只有一种不明觉厉，知识传过光滑的脑袋的感觉。那么让我依次从前置知识、基本使用、具体应用场景三个方面来向您介绍 `infer`



## 前置知识

### 条件类型

条件类型（Conditional Types）是 TypeScript 中的一种高级类型，它允许根据某个类型关系的条件成立与否来进行类型转换和选择。条件类型可以让我们在类型系统中进行逻辑判断，从而实现更加复杂和灵活的类型操作。

它的基本形式是

```typescript
T extends U ? X : Y
```

这是一种很常见的 **根据某个类型关系的条件成立与否来进行类型转换和选择**的方式。

 您可以现在 TypeScript 的 [playGround](https://www.typescriptlang.org/play) 输入

```typescript
type Result = 'hexianWeb' extends string ? true : false;
```

此时 IDE 推导出 `type Result = true`

那么反过来，如果是` 123 extends string` 则会被推导 `type Result = false`。 这就是条件类型，**根据某个类型关系的条件是否成立来选择类型。**

## 初识 infer 关键字

那么让我们来继续延伸“条件类型”这个话题。很多时候我们的判断条件与期望转换的类型并不是写死的，这就需要借助泛型来做到参数化类型的目的。比如一开始的例子可以写成以下形式

```typescript
type Result<T> = T extends string ? T : false;

type hexianString = Result<'hexian'>
```

但这只是在简单情况下，多数场景我们可能会面临**拿到的类型是判断类型的一部分**，而不是简简单单的将类型全部返回

比如我希望得到一个类型数组的第一个类型。

```typescript
type typeArray = [number, string, ...];
```

但泛型做为一个整体要提取其中一部分信息是很麻烦的，这时 TypeScript 给与我们 infer 关键字来**在条件类型中提取类型的某一部分信息**。

以下是取得类型数组的第一个类型的实例：

```typescript
type GetFirst<Arr extends unknown[]> = 
    Arr extends [infer First, ...unknown[]] ? First : never; 
type FirstElementType = GetFirst<MyArray>; //推导出 type FirstElementType = number
```

在上面代码中你可以看到，你不需要去指定 First 是什么类型 `infer` 关键字会自己根据参数化类型推断出该元素的类型。

它分解了类型参数 `MyArray` 并推导得出 `First` 类型为`number` 最后返回结果。

## infer 的具体应用场景

我们现在知道 `infer`主要作用是用来从某个泛型整体要提取并返回其中一部分信息。那么他的应用场大部分可分为以下几种

### **操作 or 提取数组元素类型**

#### 提取数组元素类型

比如本章提到的取得第一或最后一个元素

```typescript
type MyArray = [number, string];

type GetFirst<Arr extends unknown[]> = 
    Arr extends [infer First, ...unknown[]] ? First : never;

type GetLast<Arr extends unknown[]> = 
    Arr extends [...unknown[], infer Last] ? Last : never;

type FirstElementType = GetFirst<MyArray>; 
type LastElementType = GetLast<MyArray>; 
```

#### 操作数组元素类型

```typescript
type Swap<T extends any[]> = T extends [infer A, infer B] ? [B, A] : T;

type SwapResult = Swap<[1, 2]>; // 符合元组结构，首尾元素替换[2, 1]
```

（tips：infer 自由度比你想象的要高, 他可以实现以下写法）

```typescript
// 调换首尾两个
type SwapStartAndEnd<T extends any[]> = T extends [
  infer Start,
  ...infer Left,
  infer End
]
  ? [End, ...Left, Start]
  : T;
```

### **提取函数返回值类型**

```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

type MyFunc = (x: number) => string;
type Result = ReturnType<MyFunc>; // Result 是 string 类型
```

### 提取对象的属性类型

```typescript
type PropType<T, K extends keyof T> = T extends { [Key in K]: infer R }
  ? R
  : never;

type PropTypeResult1 = PropType<{ name: string }, 'name'>; // string
type PropTypeResult2 = PropType<{ name: string; age: number }, 'name' | 'age'>; // string | number
```

## 总结

这篇文章对 `infer` 关键字进行了全面的介绍，从前置知识、基本使用，到具体的应用场景都进行了阐述。通过深入了解 `infer`，我们可以更好地理解 TypeScript 中复杂的类型操作，为我们的代码提供更多的灵活性和安全性。
