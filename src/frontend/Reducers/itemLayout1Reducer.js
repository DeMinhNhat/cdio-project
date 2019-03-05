import * as Types from '../Constant/thong-tin-chung/actionTypes';

const initialState = {
    data: [
        {
        tenMonHocTV: 'Nhập môn Công nghệ phần mềm',
        tenMonHocTA: 'Introduction to Software Engineering',
        maMonHoc: 'CSC13002',
        khoiKienThuc: 'Chuyên ngành',
        soTinChi: 4,
        tietLyThuyet: 45,
        tietThucHanh: 30,
        tietTuHoc: 90,
        monTienQuyet: 'Không'
    }
]
};

export default function thongTinChung(state = initialState, action) {
    switch(action.type) {
        case Types.ADD_TTC:
            state.data.push(action.newTTC);
            return {...state};
        case Types.DELETE_TTC:
            state.data = [];
            return {...state};
        case Types.EDIT_TTC:
            state.data = [];
            state.data.push(action.newTTC);
            return {...state};
        default: 
            return {...state};
    }
}