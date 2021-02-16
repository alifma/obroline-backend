// Export Semua Method
module.exports = {

  // Kalau Tidak ada Error
  success: (res, rescode, message, pagination, arr) => {
      res.code(rescode).json({
          code: rescode,
          msg: message,
          pagination,
          data: arr,
      })
  },

  // Kalau ada error
  error: (res, rescode, message, sysMsg, arr) => {
      res.code(rescode).json({
          code: rescode,
          msg: message,
          pagination: {
              errorMsg: sysMsg
          },
          data: arr
      })
  },

  // Kalau tidak ketemu routenya
  notFound: (res, message) => {
      res.code(rescode).json({
          code: 404,
          msg: message,
      })
  }

}