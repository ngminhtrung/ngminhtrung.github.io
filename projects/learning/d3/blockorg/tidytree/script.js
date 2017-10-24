var treeData = [
    {
        "name": "Top Level",
        "parent": "null",
        "children": [
            {
                "name": "Level 2: A",
                "parent": "Top Level",
                "children": [
                    {
                        "name": "Son of A",
                        "parent": "Level 2: A"
                    },
                    {
                        "name": "Daughter of A",
                        "parent": "Level 2: A"
                    }
                ]
            },
            {
                "name": "Level 2: B",
                "parent": "Top Level"
            }
        ]
    }
];

// ************** Generate the tree diagram	 *****************
var margin = { top: 40, right: 120, bottom: 20, left: 120 },
    width = 960 - margin.right - margin.left,
    height = 500 - margin.top - margin.bottom;

var i = 0;

// tạo 1 new layout dạng tree với các thông số mặc định 
var tree = d3.layout.tree()
    .size([height, width]);

// var tree = d3.tree()
//     .size([height, width]);


// about "diagonal": http://bl.ocks.org/aaizemberg/8693661
// Bézier curve: https://en.wikipedia.org/wiki/Bézier_curve
// # diagonal.projection([projection])


var diagonal = d3.svg.diagonal()
    .projection(function (d) { return [d.x, d.y]; });

    

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

root = treeData[0];

update(root);

function update(source) {

    // Compute the new tree layout.
    // chạy tree layout, trả về 1 mảng chứa các nodes liên quan đến node "root"
    // mỗi node có các attributes sau:
    // name, parent, children, depth, x-coordinate, y-coordinate
    // tree.links(nodes) sẽ trả về 1 mảng gồm các objects thể hiện liên kết từ parent
    // đến child của từng nodes. Mỗi ọbect bao gồm source và target.
    // mảng trên hữu dụng để hiển thị diagonal shape giữa các điểm. 
    var nodes = tree.nodes(root), //reserved() là default method của object dạng array
        links = tree.links(nodes); // 
        console.log(nodes);
        console.log("Hello");
        console.log(links);

    // Normalize for fixed-depth.
    // nếu không có bước này, toạ độ y của từng nodes sẽ kiểm soát được
    // do vậy cần thiết lập để toạ độ y được tính bằng độ sâu * 100
    nodes.forEach(function (d) { d.y = d.depth * 100; });

    // Declare the nodes…
    var node = svg.selectAll("g.node")
        .data(nodes, function (d) { return d.id || (d.id = ++i); });

    // Enter the nodes.
    var nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });
    
    // tại mỗi node vẽ 1 hình tròn, 
    nodeEnter.append("circle")
        .attr("r", 10)
        .style("fill", "#fff");

    nodeEnter.append("text")
        .attr("y", function (d) {
            return d.children || d._children ? -18 : 18;
        })
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .text(function (d) { return d.name; })
        .style("fill-opacity", 1);

    // Declare the links…
    var link = svg.selectAll("path.link")
        .data(links, function (d) { return d.target.id; });

    // Enter the links.
    link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("d", diagonal);

}