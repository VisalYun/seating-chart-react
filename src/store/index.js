const seatBlock = []

const addBlock = (block) => {
    seatBlock.push(block)
}

const setBlockTransform = (id, transform) => {
    seatBlock[id].transform = transform
}

const getBlock = () => {
    return seatBlock
}

export {
    addBlock,
    setBlockTransform,
    getBlock
};