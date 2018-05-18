function BinaryTree(key){
    var root = null;//初始化根节点

    function Node(key){//节点构造函数
        this.key = key;
        this.left = null;
        this.right = null;
    }
    
    function insertNode(node,newNode){//插入节点
        if(node.key > newNode.key){
            if(node.left === null){
                node.left = newNode;
            }else{
                insertNode(node.left,newNode);
            }
        }else{
            if(node.right === null){
                node.right = newNode;
            }else{
                insertNode(node.right,newNode);
            }
        }
    }

    //callback是回调函数,控制节点的输出方式
    function inOrderTravseNode(node,callback){//中序遍历
        if(node === null) return;
        inOrderTravseNode(node.left,callback);
        callback(node.key);
        inOrderTravseNode(node.right,callback);
    }
    function preOrderTravseNode(node,callback){//前序遍历
        if(node === null) return;
        callback(node.key);
        preOrderTravseNode(node.left,callback);
        preOrderTravseNode(node.right,callback);
    }
    function postOrderTravseNode(node,callback){//后序遍历
        if(node === null) return;
        postOrderTravseNode(node.left,callback);
        postOrderTravseNode(node.right,callback);
        callback(node.key);
    }
    function minNode(node){//返回最小值数值
        if(node){
            while(node && node.left !== null){
                node = node.left;
            }
            return node.key;
        }
        return null;
    }
    function maxNode(node){//返回最大值数值
        if(node){
            while(node && node.right){
                node = node.right;
            }
            return node.key;
        }
        return null;
    }
    function searchNode(node,val){//查找节点
        if(node === null) return false;
        if(val > node.key){
            return searchNode(node.right,val);
        }else if(val < node.key){
            return searchNode(node.left,val);
        }else{
            return true;
        }
    }
    function findMin(node){//返回最小值节点
        if(node){
            while(node && node.left !== null){
                node = node.left;
            }
            return node;
        }
        return null;
    }
    function removeNode(node,val){
        if(node === null) return null;
        if(val > node.key){
            node.right =  removeNode(node.right,val);
            return node;
        }else if(val < node.key){
            node.left =  removeNode(node.left,val);
            return node;
        }else{
            if(node.left === null && node.right === null){//该节点是叶子节点时
                node = null;
                return node;
            }
            if(node.left === null){//该节点只有右节点
                node = node.right;
                return node;
            }else if(node.right === null){
                node = node.left;
                return node;
            }
            /*
                执行到这里时,说明该节点的左右子树同时存在
                第一步:找到该节点"右子树"中的最小值节点
                第二步:将该节点的值替换为最小节点的值
                第三步:删除最小值节点
                这样就可以在删除该节点的同时,保证这个二叉树仍是排序二叉树
            */
            var aux = findMin(node.right);//找到该节点"右子树"中的最小值节点
            node.key = aux.key;//将该节点的值替换为最小节点的值
            node.right = removeNode(node.right,node.key);//删除"右子树"中的最小值节点
            return node;
        }
    }

    this.insert = function(key){//插入节点接口
        var newNode = new Node(key);
        if(root === null){
            root = newNode;
        }else{
            insertNode(root,newNode);
        }
    }

    //中序遍历的作用: 可以将排序二叉树按从大到小的顺序输出
    this.inOrderTravse = function(callback){//中序遍历接口
        inOrderTravseNode(root,callback);
    }
    //前序遍历的作用: 可以将排序二叉树高效的复制一遍
    this.preOrderTravse = function(callback){//前序遍历接口
        preOrderTravseNode(root,callback);
    }
    //后序遍历的作用: 主要应用于文件系统的文件访问
    this.postOrderTravse = function(callback){//后序遍历接口
        postOrderTravseNode(root,callback);
    }

    this.min =function(){//返回最大值
        return minNode(root);
    }

    this.max = function(){//返回最小值
        return maxNode(root);
    }

    this.search = function(val){//判断val值是否存在
        return searchNode(root,val);
    }

    this.remove = function(val){
        return removeNode(root,val);
    }
}