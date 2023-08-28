  
# Svg
  
- Class
  
  - [SVG](#svg)
  
    - Constructor
  
      - [constructor(data\[, options\])](#constructordata-options)
  
    - Property
  
      - [instance](#instance)
  
    - Method
  
      - [toString()](#tostring)
  
    - Getters
  
      - [outerHTML()](#outerhtml)
      - [element()](#element)
  
## Class
  
### SVG
  
Defined in: [browser/svg.ts](../browser/svg.ts#L4C0)  
  
#### Construct Signature
  
---
  
##### constructor(data\[, options\])
  
Defined in: [src/svg/svg.ts](../../src/svg/svg.ts#L20C2)  
  
###### Parameters
  
- **data** [Data](./types.md#data)
- **options** [SVGOptions](./types.md#svgoptions) `optional`
  
##### Return Type
  
[`class`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  
- **instance** SVG `protected`
  
- outerHTML() `public`
  
  *Return Type:*
  
  [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
  
### Property
  
#### instance
  
`protected`  
Defined in: [src/svg/svg.ts](../../src/svg/svg.ts#L15C2)  
  
##### Type
  
SVG  
  
### Method
  
---
  
#### toString()
  
Defined in: [browser/svg.ts](../browser/svg.ts#L11C2)  
`public`   `override`  
  
##### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The outerHTML of the SVG as a `string`
  
##### Description
  
Outputs the SVG as a string.  
  
### Getters
  
---
  
#### outerHTML()
  
Defined in: [src/svg/svg.ts](../../src/svg/svg.ts#L55C2)  
`public`  
  
##### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
  
---
  
#### element()
  
Defined in: [browser/svg.ts](../browser/svg.ts#L22C2)  
`public`  
  
##### Return Type
  
SVGElement
  
##### Description
  
Returns the SVG element.
**Note:** This function is only available in the browser.  
