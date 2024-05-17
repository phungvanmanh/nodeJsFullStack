const { createApp, ref, onMounted } = Vue;
createApp({
    setup() {
        const add = ref({
            id_don_vi:''
        });
        const dataQuyen = ref([]);
        const edit = ref({});
        const del = ref({});

        const getQuyen = async () => {
            try {
                const res = await axios.get('/admin/quyen/get-data');
                dataQuyen.value = res.data.data;
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        const themMoi = () => {
            axios
                .post('/admin/quyen/create', add.value)
                .then((res) => {
                    if(res.data.status == true) {
                        toastr.success(res.data.message, 'success');
                        add.value = {id_don_vi:''};
                        getQuyen();
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
                .post('/admin/quyen/update', edit.value)
                .then((res) => {
                    if(res.data.status == true) {
                        toastr.success(res.data.message, 'success');
                        $("#capNhatModal").modal('hide');
                        getQuyen();
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
                .post('/admin/quyen/delete', del.value)
                .then((res) => {
                    if(res.data.status == true) {
                        toastr.success(res.data.message, 'success');
                        $("#deleteModal").modal('hide');
                        getQuyen();
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
            getQuyen();
            getQuyen();
        });
        return {
            add,
            edit,
            del,
            dataQuyen,
            themMoi,
            capNhat,
            Xoa
        };
    },
}).mount('#app');