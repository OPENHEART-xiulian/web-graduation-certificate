// export let mainHost ="https://console-mock.apipost.cn/app/mock/project/d3458ec6-983f-4344-c525-5a2706698f27/api"    //后者是代理
import { app } from "@/main.js";
import router from "@/router/index";
import { Spin } from "view-ui-plus";
import axios from "axios";

export let mainHost = "/api"; //代理地址
if (!/dzzs.rtagd.com/.test(location.host)) {
  mainHost = "https://apidoc.xlbzone.com/sgc/api";
} else {
  mainHost = "http://dzzs.rtagd.com/api"; //http://dzzs.rtagd.com/api/trainCertificate/preview
}

let api = {
  login: "/user/login",
  addTrainCertificate: "/trainCertificate/add",
  uploadImg: "/file/upload",
  importAdd: "/trainCertificate/importAdd",
  trainCertificateList: "/trainCertificate/list",
  trainCertificateEdit: "/trainCertificate/edit",
  trainCertificateIssue: "/trainCertificate/issue",
  trainCertificateDel: "/trainCertificate/del",
  trainCertificateDownload: "/trainCertificate/download",
  preview: "/trainCertificate/preview",
  trainCertificatePreview: "/trainCertificate/preview",
};

axios.create().interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.authorization = token; //请求头加上token
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
);
//做网路请求
export let httpAjax = function (
    url,
    method,
    data,
    successCallBack,
    errCallBack,
    isPop = true
) {
  axios({
    method: method,
    url: mainHost + api[url],
    data: data,
    params: method && method.toUpperCase() == "GET" ? data : "",
    headers: {
      authorization: localStorage.getItem("token"),
    },
  })
      .then(function (res) {
        const { code } = res.data;
        if (code == 200) {
          successCallBack(res.data.data);
        } else if (code == 401 || code == 0) {
          router.push("/login");
        } else if (code == 400 || code == 500) {
          if (isPop) {
            app.$Message["error"]({
              background: true,
              content: res.data.msg,
              duration: 3,
            });
          }
          if (errCallBack && code != 0) {
            errCallBack(res);
          }
        }
      })
      .catch(function (err) {
        if (errCallBack) {
          errCallBack(err);
        }
      });
};

//做上传请求
export let uploadAjax = function (url, data, successCallBack, errCallBack) {
  axios({
    method: "POST",
    url: mainHost + api[url],
    data: data,
    headers: {
      authorization: localStorage.getItem("token"),
      "Content-Type": "multipart/form-data",
    },
    transformRequest: [
      function (data) {
        let ret = "";
        for (let it in data) {
          ret +=
              encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
        }
        return ret;
      },
    ],
  })
      .then(function (res) {
        if (res.data.code == 200 || res.data.code == 0) {
          successCallBack(res.data);
        } else if (res.data.code == 401) {
          location.href = location.origin + "/#/login";
        } else {
          if (errCallBack && res.data.code != 0) {
            errCallBack(res);
          }
        }
      })
      .catch(function (err) {
        console.log("接口错误====", err);
        if (errCallBack) {
          errCallBack(err);
        }
      });
};

export const patchUploadFile = function (
    url,
    data,
    successCallBack,
    errCallBack
) {
  const param = new FormData();
  for (let key in data) {
    param.append("file", data[key]);
  }
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      authorization: localStorage.getItem("token"),
    },
  };
  axios.post(mainHost + api[url], param, config).then((res) => {
    if (res.data.code == 200 || res.data.code == 0) {
      successCallBack(res);
    } else if (res.data.code == 401) {
      location.href = location.origin + "/#/login";
    } else {
      console.error("提交上传失败");
      errCallBack(res);
    }
  });
};

export const uploadFile = function (url, data, successCallBack, errCallBack) {
  const param = new FormData();
  for (let key in data) {
    param.append(key, data[key]);
  }
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      authorization: localStorage.getItem("token"),
    },
  };
  axios.post(mainHost + api[url], param, config).then((res) => {
    if (res.data.code == 200 || res.data.code == 0) {
      successCallBack(res);
    } else if (res.data.code == 401) {
      location.href = location.origin + "/#/login";
    } else {
      console.error("提交上传失败");
      errCallBack(res);
    }
  });
};
export const uploadFileDownLoad = function (url, data) {
  const param = new FormData();
  for (let key in data) {
    console.log(key, data[key]);
    param.append(key, data[key]);
  }
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      authorization: localStorage.getItem("token"),
    },
  };
  axios.post(mainHost + api[url], param, config).then((res) => {
    let url = window.URL.createObjectURL(new Blob([res.data]));
    let link = document.createElement("a");
    link.style.display = "none";
    link.href = url;
    console.log("---res", res.headers);
    link.setAttribute("download", res.headers.exportfilename); // 需要文件名字
    document.body.appendChild(link);
    link.click();
  });
};

export const downLoad = function (url, fileName) {
  Spin.show();
  let xhr = new XMLHttpRequest();
  xhr.open("GET", mainHost + url, true);
  xhr.responseType = "blob"; // 返回类型blob
  xhr.setRequestHeader("authorization", localStorage.getItem("token")); // 设置token
  // 定义请求完成的处理函数
  xhr.onload = function () {
    let blob = this.response;
    // console.log(this)
    let reader = new FileReader();
    reader.readAsDataURL(blob); // 转换为base64，可以直接放入a的href

    reader.onload = function (e) {
      // 转换完成，创建一个a标签用于下载
      let a = document.createElement("a");
      let body = document.getElementsByTagName("body")[0];
      if (fileName) {
        a.download = fileName;
      } else {
        a.download = "无名称文件";
      }
      // a.download = params.name+'.xls';
      a.href = e.target.result;

      body.appendChild(a);
      a.click();
      a.remove();
      Spin?.hide();
      // params.exportAfter();
    };
  };

  // 发送ajax请求
  xhr.send();
};


export const downLoadWithProgress = function (url, fileName) {

  let a = document.createElement("a");
  let body = document.getElementsByTagName("body")[0];
  if (fileName) {
    a.download = fileName;
  } else {
    a.download = "无名称文件";
  }
  // a.download = params.name+'.xls';
  a.href = mainHost + url+"&token="+localStorage.getItem("token");
  body.appendChild(a);
  a.click();
  a.remove();
};
