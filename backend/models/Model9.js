var sql = require('../db');

var Model9 = (data) => {
    this.data = data;
}
Model9.add = (body, result) => {

    // delete all rules of id monhoc
    sql.query(`update quy_dinh_chung set del_flag = 1 where thong_tin_chung_id = ${body.thong_tin_chung_id}`,(err,res)=>{
        if(err){
            console.log("err: ",err);
            return result(err,null);
        }

        body.data.forEach((item,_)=>{

            sql.query(`insert into quy_dinh_chung(noi_dung,thong_tin_chung_id) values ('${item.content}',${body.thong_tin_chung_id})`, 
            (err, res) => {
              if (err) {
                  console.log("error:", err);
                  return result(err,null)
              }
          })

        })

        return result(null,res);
    })

       
}

Model9.getLoaiTaiNguyen = (result)=>{
    sql.query(`select * from tnmh_loai_tai_nguyen`, 
    (err, res) => {
      if (err) {
          console.log("error:", err);
          result(err,null)
      } else {
          result(null, res);
      }
  })
}


module.exports = Model9;