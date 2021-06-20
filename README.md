# uuidx
<!-- [![codecov](https://codecov.io/gh/reconbot/uuidx/branch/master/graph/badge.svg)](https://codecov.io/gh/reconbot/uuidx) -->
[![npm version](https://badge.fury.io/js/uuidx.svg)](http://badge.fury.io/js/uuidx)
[![Release](https://github.com/reconbot/uuidx/actions/workflows/test.yml/badge.svg)](https://github.com/reconbot/uuidx/actions/workflows/test.yml)

Base-XX UUID generator

## Overview

`uuidx` makes it easy to generate short uuid string with any encoding and encode or decode existing UUIDs. For example Base62 (url safe) or any other combination of characters. ID
generation if you use it is done by [uuid](https://github.com/kelektiv/node-uuid).

`uuidx` began as a fork of [shanehughes3](https://github.com/shanehughes3/uuidx)'s `uuidx` which began as a fork of [dmarcelino](https://github.com/dmarcelino/uuid-base62)'s `uuid-base62`. It rewritten in typescript and without maintaining global scope. Additionally it provides ESM and commonjs exports. Time marches on doesn't it?

## Installation
```shell
npm i uuidx
```

## Usage
```ts
const uuidx = require('uuidx');

const uuid = uuidx.v4();
// -> 2qY9COoAhfMrsH7mCyh86T

// decode a base-62 uuid
const originalUUID = uuidx.decode(uuid);
// -> 9af099b2-6244-4fc1-b72b-1d69a24481b7

// base-62 encode an existing traditional uuid
const encoded = uuidx.encode('8fc60e7c-3b3c-48e9-a6a7-a5fe4f1fbc31');
// -> 2fNwVYePN8WqqDFvVf7XMN
```

## API

`uuidx` is essentially a wrapper around [uuid](https://www.npmjs.com/package/uuid).
All optional parameters specified in `uuid`'s API can also be provided here.
Note that any buffer that would be returned by `uuid` will be converted into a
base-62 string representation by this library.

### v1 (timestamp-based)

`uuidx.v1()`

Returns a string. See `uuid` for optional parameters to specify timestamp and
node id.

### v4 (random)

`uuidx.v4()`

Returns a string.

### v5 (namespace)

`uuidx.v5(<name>, <namespace>)`

Returns a string. Requires:
- `name` - a string or array
- `namespace` - a string or buffer representing a uuid. String representation
  may be conventional or base-62. Two pre-defined namespaces are exposed at
  `uuidx.DNS` and `uuidx.URL`.

Examples:
```javascript
let id = uuidx.v5('https://google.com', uuidx.URL);

id = uuidx.v5('google.com' uuidx.DNS);

const myNS = uuidx.v4();
id = uuidx.v5('foobar', myNS);
```

### Encoding/decoding

`uuidx.encode(<id>, <encoding>)`

Returns a string representing a base-62 id. Takes:
- `id` - a string or array representing a conventional uuid
- `encoding` - an optional string specifying the encoding of the input id.
  Defaults to hex.

If the input id is of the incorrect length, the output will be padded with `0`
on the left or trimmed from the left.

`uuidx.decode(<id>, <encoding>)`

Returns a string representing a conventional uuid, including dashes. Takes:
- `id` - a string representing a base-62 uuid
- `encoding` - an optional string specifying the encoding of the output id.
  Defaults to hex.

If the input id is of the incorrect length, it will be padded with `0` on the
left or trimmed from the left before decoding.


### Other bases

uuidx can support other bases by assigning a new baseX charset to `customBase`:
```javascript
uuidx.customBase = new uuidx.baseX("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_");
const uuid = uuidx.v4();
// -> 31LoSI_BVeQpXtwu_-GEbL
```

## License
MIT
