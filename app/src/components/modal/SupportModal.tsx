import { useContract, useInputs, useWeb3 } from "@/hooks";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { UsefulButton } from "../Button";
import ModalBase from "./Modal";

const SupportModal: React.FC<{
  open: boolean;
  onChange: (open: boolean) => void;
}> = (props) => {
  const { value, handler, setter } = useInputs({
    name: "",
    icon: "",
    value: "",
  });
  const [maxValue, setMaxValue] = useState("");
  const { account, isLoading, provider } = useWeb3();
  const [transaction, setTransaction] = useState(false);
  const contract = useContract({});

  const support = async () => {
    if (contract) {
      setTransaction(true);
      const transaction = await contract.support(value.name, value.icon, {
        value: ethers.utils.parseEther(value.value),
      });
      await transaction.wait();
      setTransaction(false);
      props.onChange(false);
    }
  };

  useEffect(() => {
    account && setter("name")(account.ethName || account.abbreviatedId || "");
  }, [account]);
  useEffect(() => {
    account &&
      provider &&
      provider
        .getBalance(account.id)
        .then((balance) =>
          setMaxValue(
            String(Number(ethers.utils.formatEther(balance)).toFixed(2))
          )
        );
  }, [provider, account]);

  return (
    <ModalBase id="support" {...props}>
      <h3 className="text-xl font-bold">Enter info about Support</h3>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-lg font-bold">Name</span>
        </label>
        <input
          type="text"
          placeholder="Type Your Name"
          className="input input-bordered"
          value={value.name}
          onChange={handler("name")}
          disabled={isLoading}
        />
        <label className="label">
          <span className="label-text text-lg font-bold">Icon URL(option)</span>
        </label>
        <input
          type="text"
          placeholder="Type Your Name"
          className="input input-bordered"
          value={value.icon}
          onChange={handler("icon")}
          disabled={isLoading}
        />
        <label className="label">
          <span className="label-text text-lg font-bold">
            Amount Of Support
          </span>
        </label>
        <label className="input-group w-full">
          <input
            type="text"
            placeholder={`Type Amount Of Support (max ${maxValue})`}
            className="input input-bordered w-full"
            value={value.value}
            onChange={handler("value")}
            disabled={isLoading}
          />
          <span>ASTR</span>
        </label>
      </div>
      <div className="modal-action">
        <UsefulButton
          className="btn btn-primary"
          isLoading={transaction}
          onClick={() => void support()}
        >
          Submit
        </UsefulButton>
      </div>
    </ModalBase>
  );
};
export default SupportModal;
