# uuid-basex
<!-- [![codecov](https://codecov.io/gh/reconbot/uuid-basex/branch/master/graph/badge.svg)](https://codecov.io/gh/reconbot/uuid-basex) -->
[![npm version](https://badge.fury.io/js/uuid-basex.svg)](http://badge.fury.io/js/uuid-basex)
[![Release](https://github.com/reconbot/uuid-basex/actions/workflows/test.yml/badge.svg)](https://github.com/reconbot/uuid-basex/actions/workflows/test.yml)

Base-XX UUID Encoder / Decoder

## Overview

`uuid-basex` makes it easy to generate short uuid string with any encoding and encode or decode existing UUIDs. For example Base64 (url safe) or any other combination of characters. UUID generation if you use it is done by [uuid](https://github.com/kelektiv/node-uuid).

`uuid-basex` began as a fork of [shanehughes3](https://github.com/shanehughes3/uuid62)'s `uuid62` which began as a fork of [dmarcelino](https://github.com/dmarcelino/uuid-base62)'s `uuid-base62`. It rewritten in typescript and forgoes global scope. Additionally it provides ESM and commonjs exports. Time marches on doesn't it?

## Installation
```shell
npm i uuid-basex
```

## Usage
```ts
import { UUIDBaseX } from 'uuid-basex'

const uuidx = UUIDBaseX.urlSafe()
const encodedUUID = uuid.v4()
// -> G8vYZyitbW9tM_dIpBPZN

// decode a urlsafe (base64) uuid
const decodedUUID = uuidx.toUUID(encodedUUID);
// -> 2a21ff3d-8927-4be8-9770-fcdb19973f71

// urlsafe encode an existing traditional uuid
uuidx.fromUUID('2a21ff3d-8927-4be8-9770-fcdb19973f71');
// -> G8vYZyitbW9tM_dIpBPZN

// Custom dictionaries
new UUIDBaseX('ABCEFG123456').v4()
// -> F63EF42CE4E524C5GF16FG41BE3EB1FAGE36

// Because sometimes you just have to scream
const uuidAAAAAAAAA = new UUIDBaseX('aA_!')
const aAAaaUUID = uuidAAAAAAAAA.v4()
// ->  AA_!!!A!AaAA___!a!AAAAa!Aa_!!!aa__aa!_AaA___a!_!_A__!_Aa_aaAaaA!
const decodedAAA = uuidAAAAAAAAA.toUUID(aAAaaUUID)
// -> 5bf745ab-3553-4bf0-a0e4-6a3b9ae48107
```

## API

[Checkout our docs!](https://reconbot.github.io/uuid-basex/classes/uuidbasex.html)

### How does it work?

We use [`base-x`](https://github.com/cryptocoinjs/base-x) for the conversions under the hood. And for the `v4()` method we use [`uuid`](https://github.com/uuidjs/uuid#readme) the defacto standard for making uuids. If you want other uuid versions make them with `uuid` and pass them to the `fromUUID()` method because it will be a lot easier to reason about doing that, then trying to understand if you're passing a converted uuid into the arguments or not.

## License

MIT
