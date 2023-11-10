export function splitBuffer(buffer: Buffer, separator: Buffer): Buffer[] {

  const buffers: Buffer[] = [];

  for(let start = 0, index = 0; index < buffer.length; index++){
    if(buffer.subarray(index, index + separator.length).equals(separator)){
      buffers.push(buffer.subarray(start, index));
      start = index + separator.length;
    }
    if(index === buffer.length - 1){
      buffers.push(buffer.subarray(start, index + 1));
    }
  }

  return buffers;

}
