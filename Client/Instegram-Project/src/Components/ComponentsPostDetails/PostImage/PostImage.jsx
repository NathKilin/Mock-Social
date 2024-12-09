import React from "react";
const PostImage = ({ imageUrl }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        borderRadius: "10px",
        width: "100%", // Ajuste para o tamanho desejado
        maxWidth: "500px", // Limite máximo de largura
        height: "auto", // Ajuste para manter proporção
      }}
    >
      <img
        src={imageUrl}
        alt="Post"
        style={{
          width: "auto", // Ajuste da largura
          height: "300px", // Mantém a proporção
          objectFit: "cover", // Ajuste da imagem ao container
          borderRadius: "2px", // Bordas arredondadas
        }}
      />
    </div>
  );
};
export default PostImage;