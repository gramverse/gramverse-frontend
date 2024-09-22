import { Button } from "../../components/button";
import { ContainterWeb } from "../../components/container";
import { errorMessages } from "../../constants/error-messages";

export const AccountsLimit = ({ close }: { close: () => void }) => {
  return (
    <ContainterWeb className="mx-5 max-w-96">
      <div className="flex flex-col items-start gap-3">
        <h3 className="text-red-600">هشدار</h3>
        <p className="text-start text-base">
          {errorMessages["TOO_MANY_ACCOUNTS"]}
        </p>
        <div className="flex self-end">
          <Button
            onClick={() => {
              close();
            }}
          >
            {"بستن"}
          </Button>
        </div>
      </div>
    </ContainterWeb>
  );
};

export const AccountsLimitMobile = ({ close }: { close: () => void }) => {
  return (
    <div className="flex flex-col items-start gap-3 rounded-t-xl bg-primary p-5">
      <h3 className="text-red-600">هشدار</h3>
      <p className="text-start text-base">
        {errorMessages["TOO_MANY_ACCOUNTS"]}
      </p>
      <div className="flex self-end">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            close();
          }}
        >
          {"بستن"}
        </Button>
      </div>
    </div>
  );
};
