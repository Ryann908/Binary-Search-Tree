class Node{
    constructor(data = null, left = null, right = null){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree{
    root = null;
    constructor(array) {
        this.root = this.buildTree(this.mergeSort(array));
      }

    merge(left, right){
        let final = [];
        while(left.length > 0 && right.length > 0){
        
        if(left[0] < right[0]){
            if(left[0] == right[0]){
                left.shift();
            } else{
                final.push(left[0])
                left.shift();
            }
        } else{
            if(left[0] == right[0]){
                right.shift();
            } else{
                final.push(right[0]);
                right.shift();
            }
        }
    
        }
        if(right.length > 0){
            return final.concat(right)
        } else if(left.length > 0){
            return final.concat(left);
        }
    
    
        return final;
    
    }
    
    
    
    mergeSort(array){
        if(array === undefined){
            throw new Error("No array given");
            
        }
        if(array.length <= 1){return array}
        let half = Math.floor(array.length/2);
        let left = this.mergeSort(array.slice(0, half));
        let right = this.mergeSort(array.slice(half, array.length));
    
        return this.merge(left, right);
    }
    

    buildTree(array){
        let half = Math.floor(array.length/2);
        if(array[half] !== undefined){
            var node = new Node(array[half]);
        } else{
            var node = null;
        }
        if (array.length > 1) {
            let left = this.buildTree(array.slice(0, half));
            node.left = left;
            let right = this.buildTree(array.slice(half + 1, array.length));
            node.right = right;
        } 

        return node;
        

    }

    insert(value){
        let newNode = new Node(value);
  
        if (!this.root) {
          this.root = newNode;
          return;
        }
        //Checks if the new node is bigger or smaller then places it
        function inspect(node) {
          if (value === node.data) {
            return; 
          } 
    
          if (value < node.data) {
            if (node.left) {
                inspect(node.left);
            }
            else {
                node.left = newNode;
            }
          }
    
          if (value > node.data) {
            if (node.right) {
                inspect(node.right);

            }
            else {
                node.right = newNode;
            }
          }
        }
        inspect(this.root);
        if(!this.isBalanced()){
            this.reBalance();
        }
        
        
        }
    
    
    noChildren(node, checker){
        
       
        if(node.right && checker){
            node.right = null;

        }else{
            node.left = null;
        }

    }

    oneChild(node, preNode, checker){
    if(node.left){    
        if(!checker){ 
            preNode.left = node.left;       
            node.left = null;
        }else{
            preNode.right = node.left
        }
    }

    if(node.right){
        if(checker){
            preNode.right = node.right;       
            node.right = null;
        } else{
            preNode.left = node.right;
        }   
        }
    }


  

    findSuc(node, preNode, checker){
        let num;

        node = node.left;
        while (node !== null && node.right !== null) {
            node = node.right;
        }
        num = node.data;
        this.deleteItem(node.data);
        if(checker == undefined){
            this.root.data = num;
        }
        else if(checker == false){
            preNode.left.data = num;
        } else{
            preNode.right.data = num;

        }
}


findSuc2(node, checker){
    if(!checker){
        this.root = node.right;
    } else{
        this.root = node.left;
    }
}
    
    
    
    deleteItem(value){
       let node = this.root;
       let preNode = null;
       let delNode = null;
       let checker = true;
        while(node){
            if(value == node.data){
                delNode = node;  
                break;

            }
            if(value < node.data){
                preNode = node;
                node = node.left;
                checker = false;

            }
            if(value > node.data){
                preNode = node;
                node = node.right
                checker = true;
            }
        }
        if(this.root.data == value){
            checker = undefined;
        }
        if(node.left && node.right){
                this.findSuc(node, preNode, checker);
            
        } 
       else if(!node.right && !node.left){
            this.noChildren(preNode, checker);
        }
        
        else if(node.left && !node.right){
            if(this.root != node){
            this.oneChild(delNode, preNode, checker);
            }
            else{
                checker = true;
                this.findSuc2(node, checker);
            }
        } else if(!node.left && node.right){
            if(this.root != node){
                this.oneChild(delNode, preNode, checker);
                }
                else{
                    checker = false;
                    this.findSuc2(node, checker);
                }        
            }
    }
    find(value){
        let node = this.root;
        while(node){
            if(value == node.data){
                node = node;  
                break;
            }
            if(value < node.data){
                node = node.left;

            }
            if(value > node.data){
                node = node.right
            }
        }  
        return node;
    }
    
    levelOrder(callback){
        if(callback == null){
            return; 
        }
        let queue = [];
        let dequeue = [];
        let current;
        queue.push(callback);
        while(queue.length > 0){
            current = queue[0];
            dequeue.push(current.data);
            if(current.left){
                queue.push(current.left);
            }
            if(current.right){
                queue.push(current.right);
            }
            queue.shift();
        }
        return dequeue;
    }


    //simple rec
    q = [];
    inOrder(callback){        
         if(callback === null){
            return;
        }    

        this.inOrder(callback.left);
        this.q.push(callback.data)
        this.inOrder(callback.right);
        return this.q;
}

    // simple rec and while
    que = [];
    preOrder(callback){
        if(callback === null){
            return;
        }
    //     let par = [];
    //     let queue = [];
    //     queue.push(callback.data)
    //     while (callback !== null){        
    //     if(callback == par[par.length-1]){ 
    //             callback = callback.right;
    //             queue.push(callback.data); 
    //             par.pop();
    //     } else{
    //         if(callback.left && callback.right){
    //             par.push(callback);
    //         }
    //         if(callback.left){
    //             callback = callback.left;
    //             queue.push(callback.data);
    //             if(par.length == 0){
    //                 return(queue);
    //             } 
    //         } 
    //         if(!callback.left && !callback.right){
    //             callback = par[par.length-1];
    //         }
    //     }
        
    // } 
    this.que.push(callback.data);
    this.preOrder(callback.left);
    this.preOrder(callback.right);
    return this.que;

    }
    // simple rec
    qu = [];
    postOrder(callback){
        if(callback === null){
            return;
        }
        this.postOrder(callback.left);
        this.postOrder(callback.right);
        this.qu.push(callback.data);
        return this.qu;
    }

    //Use height(tree.find(value)); to find a specific node same with depth.
    height(node) {
        if (node === null) {
            return 0;
        }
    
        const lD = this.height(node.left);
        const rD = this. height(node.right);
    
        return Math.max(lD, rD) + 1;
    }

    depth(node){
        if (!this.root || !node) {
            return;
          }
      
          const value = node.data;
          let depth = 0;
          let currentNode = this.root;
      
          while (currentNode) {
            if (value === currentNode.data) {
                break;
            }
            if (value < currentNode.data) {
                currentNode = currentNode.left;
            }
            if (value > currentNode.data) {
                currentNode = currentNode.right;
            }
      
            depth++;
          }
      
          if (!currentNode) {
            return;
        }
          return depth;
    }
    //uses the height function to check the height of left and right node
    //if the left node +1 = right node true and vice-versa
    //other wise false 
    isBalanced(){
        if(this.height(this.root.left) + 1 == this.height(this.root.right) || this.height(this.root.left) == this.height(this.root.right)){
            return true;
        } else if(this.height(this.root.left) == this.height(this.root.right) + 1){
            return true;
        } else{
            return false;
        }
    }
    // recalls Tree and creates a new tree and sets it to the old value
    // uses inOrder to get it sorted and produces an array so it functions well
    reBalance(){
        tree = new Tree(this.inOrder(this.root));
        return;
    }
    
    

    
    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          this.prettyPrint(
            node.right,
            `${prefix}${isLeft ? "│   " : "    "}`,
            false,
          );
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }
}



let tree = new Tree([1,7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);



tree.insert(2);
tree.deleteItem(4);

console.log(tree.inOrder(tree.root));

tree.prettyPrint();


