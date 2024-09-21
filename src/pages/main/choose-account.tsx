import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button";
import { ContainterWeb } from "../../components/container";
import { useGetAccounts } from "../../services/switch-account";
import { AccountInfo } from "./account-info";

export const ChooseAccount = ({ close }: { close: () => void }) => {
  const { accounts, isSuccess } = useGetAccounts();
  const navigate = useNavigate();
  return (
    <ContainterWeb className="mx-5 max-w-96">
      <div className="flex flex-col items-start gap-3">
        <p className="text-start text-lg">
          {"لطفا یکی از اکانت های خود را انتخاب کنید"}
        </p>
        <div className="mx-5 flex flex-col gap-8 border border-x-0 border-t-0 border-solid border-form-border py-8">
          {isSuccess &&
            accounts?.map((account) => {
              return (
                <AccountInfo
                  key={account.userName}
                  account={account}
                  close={close}
                />
              );
            })}
        </div>
        <Button
          classes="self-end"
          onClick={() => {
            close();
            navigate("/login");
          }}
        >
          {"رفتن به صفحه ورود"}
        </Button>
      </div>
    </ContainterWeb>
  );
};

export const ChooseAccountMobile = ({ close }: { close: () => void }) => {
  const { accounts, isSuccess } = useGetAccounts();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-start gap-3 rounded-t-xl bg-primary p-5">
      <p className="text-start text-lg">
        {"لطفا یکی از اکانت های خود را انتخاب کنید"}
      </p>
      <div className="mx-5 flex flex-col gap-8 border border-x-0 border-t-0 border-solid border-form-border py-8">
        {isSuccess &&
          accounts?.map((account) => {
            return (
              <AccountInfo
                key={account.userName}
                account={account}
                close={close}
              />
            );
          })}
      </div>
      <Button
        classes="self-end"
        onClick={() => {
          close();
          navigate("/login");
        }}
      >
        {"رفتن به صفحه ورود"}
      </Button>
    </div>
  );
};
