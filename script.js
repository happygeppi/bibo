const PAGE_LENGTH = 2048; // = n * 256, n in naturals
const NUM_ROUNDS = 5;

const NUM_CUBES = PAGE_LENGTH * 6 / 512; // #cube = #char * 6bits/char / 512bits/cube

function Content(page) {
  if (page.length < PAGE_LENGTH) page = fill(page);
  return Alphabetize(Encrypt(Bits(page)));
}

function Page(content) {
  if (content.length < PAGE_LENGTH) content = fill(content);
  return Alphabetize(Decrypt(Bits(content)));
}

function Encrypt(bits) {
  for (let round = 0; round < NUM_ROUNDS; round++) {
    for (let cube = 0; cube < NUM_CUBES; cube++) {
      bits[cube] = Sub(Rotate(Sub(Rotate(Sub(bits[cube])))));
    }
    bits = ShuffleCubes(bits);
  }

  return OneDimension(bits);
}

function Decrypt(bits) {
  for (let round = 0; round < NUM_ROUNDS; round++) {
    bits = unShuffleCubes(bits);
    for (let cube = 0; cube < NUM_CUBES; cube++)
      bits[cube] = unSub(unRotate(unSub(unRotate(unSub(bits[cube])))));
  }

  return OneDimension(bits);
}

function Sub(cube) {
  const subbed = [];

  for (let k = 0; k < 8; k++) {
    subbed.push([]);
    for (let j = 0; j < 8; j++) subbed[k][j] = SUBBOX[cube[k][j]];
  }

  return subbed;
}

function unSub(subbed) {
  const cube = [];

  for (let k = 0; k < 8; k++) {
    cube.push([]);
    for (let j = 0; j < 8; j++) cube[k][j] = unSUBBOX[subbed[k][j]];
  }

  return cube;
}

function Rotate(cube) {
  const rotated = [];

  for (let k = 0; k < 8; k++) {
    rotated.push([]);
    for (let j = 0; j < 8; j++) {
      rotated[k][j] = "";
      for (let i = 0; i < 8; i++) {
        rotated[k][j] += cube[i][k][j];
      }
    }
  }

  return rotated;
}

function unRotate(rotated) {
  const cube = [];

  for (let k = 0; k < 8; k++) {
    cube.push([]);
    for (let j = 0; j < 8; j++) {
      cube[k][j] = "";
      for (let i = 0; i < 8; i++) {
        cube[k][j] += rotated[j][i][k];
      }
    }
  }

  return cube;
}

function ShuffleCubes(bits) {
  const bitString = OneDimension(bits);

  const bitList = [];
  for (let i = 0; i < NUM_CUBES; i++) bitList[i] = "";
  for (let i = 0; i < bitString.length; i++) bitList[i % NUM_CUBES] += bitString[i];

  const shuffled = [];

  for (let cube = 0; cube < NUM_CUBES; cube++) {
    shuffled.push([]);
    for (let k = 0; k < 8; k++) {
      shuffled[cube].push([]);
      for (let j = 0; j < 8; j++) {
        const index = 64 * k + 8 * j;
        shuffled[cube][k][j] = bitList[cube].slice(index, index + 8);
      }
    }
  }

  return shuffled;
}

function unShuffleCubes(bits) {
  const shuffledBitList = [];
  for (let i = 0; i < NUM_CUBES; i++) shuffledBitList[i] = "";

  for (let cube = 0; cube < NUM_CUBES; cube++)
    for (let k = 0; k < 8; k++)
      for (let j = 0; j < 8; j++) shuffledBitList[cube] += bits[cube][k][j];

  let bitString = "";
  for (let index = 0; index < 512; index++)
    for (let cube = 0; cube < NUM_CUBES; cube++)
      bitString += shuffledBitList[cube][index];

  const unshuffled = [];

  for (let cube = 0; cube < NUM_CUBES; cube++) {
    unshuffled.push([]);
    for (let k = 0; k < 8; k++) {
      unshuffled[cube].push([]);
      for (let j = 0; j < 8; j++) {
        const index = 512 * cube + 64 * k + 8 * j;
        unshuffled[cube][k][j] = bitString.slice(index, index + 8);
      }
    }
  }

  return unshuffled;
}

function Alphabetize(bits) {
  let text = "";

  for (let char = 0; char < bits.length / 6; char++) {
    const charCode = bits.slice(6 * char, 6 * char + 6);
    text += ALPHABET[parseInt(charCode, 2)];
  }

  return text;
}

function OneDimension(bits) {
  let bitString = "";

  for (let cube = 0; cube < NUM_CUBES; cube++)
    for (let k = 0; k < 8; k++)
      for (let j = 0; j < 8; j++) bitString += bits[cube][k][j];

  return bitString;
}

function Bits(text) {
  const rawBits = text
    .split("")
    .map((char) => CHARCODE[char])
    .join("");

  const bits = [];
  for (let cube = 0; cube < NUM_CUBES; cube++) {
    bits.push([]);
    for (let k = 0; k < 8; k++) {
      bits[cube].push([]);
      for (let j = 0; j < 8; j++) {
        const index = 512 * cube + 64 * k + 8 * j;
        bits[cube][k][j] = rawBits.slice(index, index + 8);
      }
    }
  }

  return bits;
}

function ran() {
  let page = "";
  for (let i = 0; i < PAGE_LENGTH; i++) page += ALPHABET.random();
  return page;
}

function fill(text) {
  return text.padEnd(PAGE_LENGTH, " ");
}

String.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};

String.prototype.char = function () {
  return ALPHABET.indexOf(this);
};

Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};
