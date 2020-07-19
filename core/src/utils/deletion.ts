import fs from "fs";
import path from "path";

const deleteProductImage = (filename: string) => {
  fs.unlink(
    path.resolve("..", "..", "uploads", "products", filename),
    function (err) {
      if (err) throw err;
    }
  );
};

export { deleteProductImage }
