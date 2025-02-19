import grey from "@assets/img/grey.png";
import plus from "@assets/img/plus.png";
import useGetWorkersList from "../../../api/hooks/ClinicHooks/useGetWorkersList";
import useGetUserInfo from "../../../api/hooks/UserHooks/useGetUserInfo";
import MoreInfoButtFirm from "../../../components/Buttons/MoreInfoButt/MoreInfoButtFirm";
import AddWorkersModal from "../../../components/Modals/AddWorkersModal/AddWorkersModal";
import tablecss from "../../../components/Table/Table.module.css";
import useStore from "../../../data/store";
import Table from "./../../../components/Table/Table";
import styles from "./Workers.module.css";

function Workers() {
  const { setModalActive, setModalContent } = useStore();
  const { data: clinic } = useGetUserInfo();
  const { data, isLoading } = useGetWorkersList({ clinicId: clinic?.id });

  const tableData =
    data?.doctors?.map((doctor) => ({
      img: doctor.user.photo || grey,
      name: `${doctor.user.first_name} ${doctor.user.last_name}`,
      id: doctor.id,
      gender: doctor.user.gender,
      specialty: doctor.specialty.name,
    })) || [];

  const columns = [
    {
      header: "Search",
      render: (item) => (
        <div className={tablecss.nameTd}>
          {item.img && (
            <img src={item.img} alt="Avatar" className={tablecss.round} />
          )}
          <span>{item.name || "-"}</span>
        </div>
      ),
    },
    { header: "ID", dataKey: "id" },
    { header: "Płeć", dataKey: "gender" },
    { header: "Specjalizacja", dataKey: "specialty" },
    {
      header: (
        <img
          onClick={handleAddWorkersModal}
          className={styles.plus}
          src={plus}
          alt="add"
        />
      ),
      render: (item) => (
        <MoreInfoButtFirm
          id={item.id}
          onClick={() => console.log(item.id)}
          label="More Info"
        />
      ),
    },
  ];

  function handleAddWorkersModal() {
    setModalActive(true);
    setModalContent(<AddWorkersModal />);
  }

  return (
    <div className="content">
      <Table
        loading={isLoading}
        columns={columns}
        data={tableData}
        showImage={true}
        together={true}
        inputPlaceholder="Szukaj pracownika..."
      />
    </div>
  );
}

export default Workers;
