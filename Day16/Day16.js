const fs = require("fs");
let array = fs
  .readFileSync("C:\\JavaScript\\Advencode\\Day16\\data16.txt", "utf8")
  .split("");
array = array.map((number) => {
  return parseInt(number, 16);
});
array = array.map((number) => {
  if (number.toString(2).length < 4) {
    let i = 4 - number.toString(2).length;
    let binary = "0";
    for (i; i > 1; i--) {
      binary += "0";
    }
    binary += number.toString(2);
    return binary;
  } else {
    return number.toString(2);
  }
});

let code = array.join("");

console.log(code);
const versions = [];

const versionparser = (packet) => {
  if (packet.length < 8) {
    return;
  }
  let results = [];
  let version = packet.slice(0, 3);
  //console.log("packet " + packet);
  versions.push(version);
  let type = packet.slice(3, 6);
  if (type === "100") {
    let literalvalue = packet.slice(6);
    let innerResults = [];
    let finish = false;
    let cut = 0;
    while (!finish) {
      if (literalvalue[cut] === "0") {
        finish = true;
        cut += 5;
        //console.log("cut " + literalvalue.slice(cut));
        let result = versionparser(literalvalue.slice(cut));
        if (result && result.length) {
          //console.log(results);
          innerResults.push(...result);
        }
        literalvalue = literalvalue.slice(0, cut);
        literalvalue = Array.from(literalvalue);
        literalvalue = literalvalue.filter((number, index) => {
          if (index % 5 !== 0) {
            return number;
          }
        });
        literalvalue = literalvalue.join("");

        console.log(parseInt(literalvalue.slice(0, cut), 2));
        innerResults.push(parseInt(literalvalue.slice(0, cut), 2));

        return innerResults;
      } else {
        cut += 5;
      }
    }
    //literal value
  } else {
    //operator
    let lengthId = packet[6];
    if (lengthId === "1") {
      let subpacketsNumber = packet.slice(7, 18);
      subpacketsNumber = parseInt(subpacketsNumber, 2);
      //console.log(subpacketsNumber);
      let subpacket = packet.slice(18);
      //console.log("1  " + subpacket);
      let subpacketresult = versionparser(subpacket);
      if (subpacketresult) {
        results.push(subpacketresult);
      }
    } else {
      let subpacketsLength = packet.slice(7, 22);
      //console.log(subpacketsLength);
      subpacketsLength = parseInt(subpacketsLength, 2);
      //console.log(subpacketsLength);
      let subpacket = packet.slice(22, 22 + subpacketsLength);
      //console.log("0  " + subpacket);
      let subpacketresult = versionparser(subpacket);
      if (subpacketresult) {
        results.push(subpacketresult);
      }
      let subpacketresult2 = versionparser(packet.slice(22 + subpacketsLength));
      if (subpacketresult2) {
        results.push(subpacketresult2);
      }
    }
  }
  let res = [...results][0];
  //console.log(res);
  if (type === "000") {
    if (typeof res !== "number") {
      return res.reduce(function (previousValue, currentValue, index, array) {
        return previousValue + currentValue;
      });
    } else {
      return res;
    }
  }
  if (type === "001") {
    if (typeof res !== "number" && res) {
      return res.reduce(function (previousValue, currentValue, index, array) {
        return previousValue * currentValue;
      });
    } else {
      return res;
    }
  }

  if (type === "010") {
    if (typeof res === "number") {
      return res;
    } else {
      return Math.min(...res);
    }
  }
  if (type === "011") {
    if (typeof res === "number") {
      return res;
    } else {
      return Math.max(...res);
    }
  }
  if (type === "101") {
    return res[1] > res[0] ? 1 : 0;
  }
  if (type === "110") {
    return res[1] < res[0] ? 1 : 0;
  }
  if (type === "111") {
    return res[1] === res[0] ? 1 : 0;
  }

  //console.log(version, type, lengthId);
};

console.log(versionparser(code));
let sum = 0;
versions.forEach((version) => {
  sum += parseInt(version, 2);
});
//console.log(sum);
//110000100000000010 11010000001 01010000010

const input = fs
  .readFileSync("C:\\JavaScript\\Advencode\\Day16\\data16.txt", "utf8") // read day??.txt content
  .trim();

class Packet {
  constructor({ version, typeId }) {
    this.version = version;
    this.typeId = typeId;
    this.packets = [];
  }
}

/**
 * take a binary string, return a list of packets
 */
function parsePackets(input, totalSubpackets = -1) {
  const packets = [];
  let totalPackets = 0;
  const startInputSize = input.length;
  while (
    input.length > 0 &&
    (totalSubpackets < 0 || totalPackets < totalSubpackets)
  ) {
    if (/^0+$/.test(input)) {
      // Only zeros, most likely due to padding
      break;
    }
    const version = parseInt(input.substring(0, 3), 2);
    const typeId = parseInt(input.substring(3, 6), 2);
    const packet = new Packet({
      version,
      typeId,
    });
    totalPackets++;
    input = input.substring(6);

    // literal
    if (typeId === 4) {
      let binaryString = "";
      while (input[0] === "1") {
        binaryString += input.substring(1, 5);
        input = input.substring(5);
      }
      binaryString += input.substring(1, 5);
      input = input.substring(5);
      packet.value = parseInt(binaryString, 2);
    } else {
      const lengthTypeId = input[0];
      input = input.substring(1);
      if (lengthTypeId === "0") {
        const length = parseInt(input.substring(0, 15), 2);
        input = input.substring(15);

        const subpackets = input.substring(0, length);
        packet.packets = parsePackets(subpackets);
        input = input.substring(length);
      } else {
        const totalSubPackets = parseInt(input.substring(0, 11), 2);
        input = input.substring(11);

        packet.packets = parsePackets(input, totalSubPackets);
        input = input.substring(packet.packets.consumed);
        delete packet.packets.consumed;
      }

      //we have the list of subpackets, we can act on it
      switch (typeId) {
        case 0: // sum
          packet.value = packet.packets.reduce((a, b) => a + b.value, 0);
          break;
        case 1: // product
          packet.value = packet.packets.reduce((a, b) => a * b.value, 1);
          break;
        case 2: // min
          packet.value = Math.min(...packet.packets.map((p) => p.value));
          break;
        case 3: // max
          packet.value = Math.max(...packet.packets.map((p) => p.value));
          break;
        case 5: //greater than
          packet.value = Number(
            packet.packets[0].value > packet.packets[1].value
          );
          break;
        case 6: //lower than
          packet.value = Number(
            packet.packets[0].value < packet.packets[1].value
          );
          break;
        case 7: //equal to
          packet.value = Number(
            packet.packets[0].value === packet.packets[1].value
          );
          break;
        default:
          break;
      }
    }
    packets.push(packet);
  }
  packets.consumed = startInputSize - input.length;
  return packets;
}

function sumVersions(packets) {
  return packets
    .map((p) => p.version + sumVersions(p.packets))
    .reduce((a, b) => a + b, 0);
}

function hexToBinary(hex) {
  return [...hex].map((n) => parseInt(n, 16).toString(2).padStart(4, "0"))
    .join``;
}

function part1(input) {
  const binary = hexToBinary(input);
  const packets = parsePackets(binary);

  // console.log(JSON.stringify(packets, null, 2));

  return sumVersions(packets);
}

function assertEqual(a, b) {
  if (a === b) {
    console.log("🎉 Yay", a, b);
  } else {
    console.log("😭 Oops", a, b);
  }
}

// assertEqual(part1("D2FE28"), 6);
// assertEqual(part1("38006F45291200"), 9);
// assertEqual(part1("8A004A801A8002F478"), 16);
// assertEqual(part1("620080001611562C8802118E34"), 12);
// assertEqual(part1("C0015000016115A2E0802F182340"), 23);
// assertEqual(part1("A0016C880162017C3686B18A3D4780"), 31);

console.log(part1(input));

function part2(input) {
  const binary = hexToBinary(input);
  const packets = parsePackets(binary);

  return packets[0].value;
}

// assertEqual(part2("C200B40A82"), 3);
// assertEqual(part2("04005AC33890"), 54);
// assertEqual(part2("880086C3E88112"), 7);
// assertEqual(part2("CE00C43D881120"), 9);
// assertEqual(part2("D8005AC2A8F0"), 1);
// assertEqual(part2("F600BC2D8F"), 0);
// assertEqual(part2("9C005AC2F8F0"), 0);
// assertEqual(part2("9C0141080250320F1802104A08"), 1);

console.log(part2(input));
