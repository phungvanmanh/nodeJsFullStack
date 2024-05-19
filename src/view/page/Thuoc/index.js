const { createApp, ref, onMounted } = Vue;
createApp({
    setup() {
        const add = ref({
            id_don_vi:'',
            id_nhom_thuoc:'',
        });
        const dataDonVi = ref([]);
        const dataThuoc = ref([]);
        const edit = ref({});
        const del = ref({});
        const dataNhomThuoc = ref([]);
        const fetchNhomThuoc = async () => {
            try {
                const res = await axios.get('/admin/nhom-thuoc/get-data');
                dataNhomThuoc.value = res.data.data;
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        const getDonVi = async () => {
            try {
                const res = await axios.get('/admin/don-vi/get-data');
                dataDonVi.value = res.data.data;
                console.log(dataDonVi.value);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        const fetchData = async () => {
            try {
                const res = await axios.get('/admin/thuoc/get-data');
                dataThuoc.value = res.data.data;
                console.log(dataThuoc.value);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        const themMoi = () => {
            axios
                .post('/admin/thuoc/create', add.value)
                .then((res) => {
                    if(res.data.status == true) {
                        toastr.success(res.data.message, 'success');
                        add.value = {id_don_vi:''};
                        fetchData();
                    }
                })
                .catch((res) => {
                    $.each(res.response.data.errors, function(k, v) {
                        toastr.error(v.msg, 'error');
                    });
                });
        }

        const capNhat = () => {
            axios
                .post('/admin/thuoc/update', edit.value)
                .then((res) => {
                    if(res.data.status == true) {
                        toastr.success(res.data.message, 'success');
                        $("#capNhatModal").modal('hide');
                        fetchData();
                    }
                })
                .catch((res) => {
                    console.log(res.response.data.errors);
                    $.each(res.response.data.errors, function(k, v) {
                        toastr.error(v.msg, 'error');
                    });
                });
        }

        const Xoa = () => {
            axios
                .post('/admin/thuoc/delete', del.value)
                .then((res) => {
                    if(res.data.status == true) {
                        toastr.success(res.data.message, 'success');
                        $("#deleteModal").modal('hide');
                        fetchData();
                    }
                })
                .catch((res) => {
                    console.log(res.response.data.errors);
                    $.each(res.response.data.errors, function(k, v) {
                        toastr.error(v.msg, 'error');
                    });
                });
        }

        onMounted(() => {
            fetchData();
            getDonVi();
            fetchNhomThuoc();
        });
        return {
            add,
            edit,
            del,
            dataDonVi,
            dataThuoc,
            dataNhomThuoc,
            themMoi,
            capNhat,
            Xoa
        };
    },
}).mount('#app');