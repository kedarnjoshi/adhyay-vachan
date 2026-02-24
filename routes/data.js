var express = require('express');
var router = express.Router();

module.exports = router;

router.patch('/read', (req, res) => {
    if (!req.body) res.status(400).send({message: 'Request must contain the body.'});
    const req_body = req.body;
    console.log(req_body);
    let new_completed = req.body.completed
    for (let i = 0; i < all_lists.length; i++) {
        for (let j = 0; j < all_lists[i].length; j++) {
            if (all_lists[i][j].id === req_body.id) {
                all_lists[i][j].completed = new_completed;
                res.status(200).send({message: 'Successfully changed read status to ' + new_completed});
                return;
            }
        }
    }
    res.status(404).send({message: 'Person not found with id ' + req_body.id});

})

router.get('/', function(req, res) {
    const query = req.query;
    if (query.no) query.no = parseInt(query.no);

    for (let i = 0; i < all_lists.length; i++) {
        all_lists[i].sort((a,b) => a.adhyay - b.adhyay)
    }

    if (!query.no) {
        return res.status(200).send(all_lists);
    }
    else if (query.no === 1) return res.status(200).send(list1);
    else if (query.no === 2) return res.status(200).send(list2);

    else return res.status(400).send({error: 'Query Parameters are not valid'})
})

router.patch('/next', (req, res) => {
    for (let i = 0; i < all_lists.length; i++) {
        all_lists[i].forEach(item => {
            item.adhyay === 21 ? item.adhyay = 1 : item.adhyay += 1;
            item.completed = false;
        })
    }
    res.status(200).send({message: 'Successfully changed to next'})
})


const list1 = [
    { id: 1, name: "Shridhar Joshi", completed: false, adhyay: 1 },
    { id: 2, name: "Aniruddha Kulkarni", completed: true, adhyay: 2 },
    { id: 3, name: "Madhav Deshpande", completed: false, adhyay: 3 },
    { id: 4, name: "Raghunath Bapat", completed: false, adhyay: 4 },
    { id: 5, name: "Sandeep Gokhale", completed: true, adhyay: 5 },
    { id: 6, name: "Vishwas Agashe", completed: false, adhyay: 6 },
    { id: 7, name: "Milind Apte", completed: false, adhyay: 7 },
    { id: 8, name: "Prasad Phadke", completed: true, adhyay: 8 },
    { id: 9, name: "Nitin Ketkar", completed: false, adhyay: 9 },
    { id: 10, name: "Shailesh Thatte", completed: false, adhyay: 10 },
    { id: 11, name: "Uday Damle", completed: false, adhyay: 11 },
    { id: 12, name: "Ameya Deo", completed: true, adhyay: 12 },
    { id: 13, name: "Suhas Paranjape", completed: false, adhyay: 13 },
    { id: 14, name: "Sameer Karve", completed: false, adhyay: 14 },
    { id: 15, name: "Nilesh Ranade", completed: true, adhyay: 15 },
    { id: 16, name: "Ajinkya Puranik", completed: false, adhyay: 16 },
    { id: 17, name: "Mandar Athavale", completed: false, adhyay: 17 },
    { id: 18, name: "Vinayak Sathe", completed: true, adhyay: 18 },
    { id: 19, name: "Chinmay Vaidya", completed: false, adhyay: 19 },
    { id: 20, name: "Tejas Godbole", completed: false, adhyay: 20 },
    { id: 21, name: "Kedar Lele", completed: false, adhyay: 21 }
];

const list2 = [
    { id: 22, name: "Ashutosh Bhave", completed: false, adhyay: 1 },
    { id: 23, name: "Sachin Dixit", completed: true, adhyay: 2 },
    { id: 24, name: "Mahesh Vartak", completed: false, adhyay: 3 },
    { id: 25, name: "Adwait Oak", completed: false, adhyay: 4 },
    { id: 26, name: "Rohit Date", completed: true, adhyay: 5 },
    { id: 27, name: "Onkar Sahasrabuddhe", completed: false, adhyay: 6 },
    { id: 28, name: "Girish Rege", completed: true, adhyay: 7 },
    { id: 29, name: "Siddharth Bhalerao", completed: false, adhyay: 8 },
    { id: 30, name: "Anand Limaye", completed: false, adhyay: 9 },
    { id: 31, name: "Saurabh Natu", completed: true, adhyay: 10 },
    { id: 32, name: "Harshad Khare", completed: false, adhyay: 11 },
    { id: 33, name: "Kaustubh Tambe", completed: false, adhyay: 12 },
    { id: 34, name: "Amol Bidkar", completed: true, adhyay: 13 },
    { id: 35, name: "Swapnil Pendse", completed: false, adhyay: 14 },
    { id: 36, name: "Yogesh Kanitkar", completed: false, adhyay: 15 },
    { id: 37, name: "Shantanu Rajwade", completed: true, adhyay: 16 },
    { id: 38, name: "Mangesh Karmarkar", completed: false, adhyay: 17 },
    { id: 39, name: "Nikhil Chitale", completed: false, adhyay: 18 },
    { id: 40, name: "Abhijit Palshikar", completed: true, adhyay: 19 },
    { id: 41, name: "Rohan Bhuskute", completed: false, adhyay: 20 },
    { id: 42, name: "Tushar Modak", completed: false, adhyay: 21 }
];

const all_lists = [list1, list2]
