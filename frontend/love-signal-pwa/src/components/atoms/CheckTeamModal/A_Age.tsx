type propsType = {
  age: number;
};

const CheckTeamAge: React.FC<propsType> = ({ age }) => {
  return <span style={{ fontSize: "16px", marginLeft: "8px" }}>{age}</span>;
};

export default CheckTeamAge;
