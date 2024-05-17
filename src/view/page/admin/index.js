const { createApp, ref, onMounted } = Vue;
createApp({
    setup() {
        const add = ref({id_cua_hang : '', id_quyen:''});
        const edit = ref({});
        const del = ref({});
        const dataAdmin = ref([]);
        const dataQuyen = ref([]);
        const dataCuaHang = ref([]);
        const fetchData = async () => {
            try {
                const res = await axios.get('/admin/get-data');
                dataAdmin.value = res.data.data;
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        const getQuyen = async () => {
            try {
                const res = await axios.get('/admin/quyen/get-data');
                dataQuyen.value = res.data.data;
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        const fetchDataCuaHang = async () => {
            try {
                const res = await axios.get('/admin/cua-hang/get-data');
                dataCuaHang.value = res.data.data;
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        
        const themMoi = () => {
            axios
                .post('/admin/create', add.value)
                .then((res) => {
                    if(res.data.status == true) {
                        toastr.success(res.data.message, 'success');
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

        const capNhat = () => {
            axios
                .post('/admin/update', edit.value)
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
                .post('/admin/delete', del.value)
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
            fetchDataCuaHang();
            getQuyen();
        });
        return {
            add,
            edit,
            del,
            dataAdmin,
            dataCuaHang,
            dataQuyen,
            themMoi,
            capNhat,
            Xoa
        };
    },
}).mount('#app');
