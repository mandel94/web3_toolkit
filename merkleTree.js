class MerkleTree {
    constructor(leaves, concat) {
        this.leaves = leaves;
        this.concat = concat;
        this.height = this.getMerklehHeight(this.leaves.length);
        this.layers = [];
        this.buildTree();
    }

    getRoot() {
        console.log(this.layers)
        return this.layers[0]['data'] 
    }

    getMerklehHeight(leafCount) {
        let heightCounter = 1;
        while (leafCount > 1) {
            heightCounter++
            leafCount = Math.ceil(leafCount / 2);
        }
        return heightCounter;
    }

    
    buildTree() {
        const baseLayer = this.leaves;
        let baseLayerHeight = this.height; 
        this.layers.push({height: baseLayerHeight, data: baseLayer});
        this.addLayers(--baseLayerHeight, this.layers[0]);  
    }

    addLayers(layerHeight, fromNodes) { // 0-indexed layerHeight
        const isRootLayer = (layerHeight === 0);
        const isOddLayer = fromNodes.data.length % 2 !== 0;
        if (isRootLayer) return;
        this.layers.unshift({height: layerHeight, data: []})
        for (let i = 0;; i += 2) {
            let isThereSibling = Boolean(fromNodes.data[i+1]);
            if (isThereSibling) {
                this.layers[0].data.push(this.concat(fromNodes.data[i], fromNodes.data[i+1]));
            } else {
                if (isOddLayer) this.layers[0].data.push([...fromNodes.data].pop());
                break;
            }
        }
        this.addLayers(--layerHeight, this.layers[0]);
    }

    getProof() {
        console.log(this.layers);
        return this.layers;
    }
}



module.exports = MerkleTree;


