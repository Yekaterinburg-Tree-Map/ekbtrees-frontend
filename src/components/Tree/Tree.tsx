import React, {Component} from 'react';
import styles from './Tree.module.css'
import modalStyles from "../Modal/Modal.module.css";
import {Link} from "react-router-dom";
import Spinner from "../Spinner";
import {approveTree, getTree, deleteTree, getCommentsTrees} from "../../api/tree";
import {getFilesByTree, deleteFiles} from "../../api/files";
import {formatDate} from '../../helpers/date';
import FileUpload from "../FileUpload";
import {ITreeModelConverted, IJsonTree, IFile} from "../../common/types";
import {ITreeProps, ITreeState, LocationState} from "./types";
import Modal from "../Modal/Modal";
import {isNumber} from "../../common/treeForm";
import {RouteComponentProps} from 'react-router-dom';
import {StaticContext} from "react-router";
import PageHeader from "../PageHeader";
import {PAGES} from '../../constants/pages';


export class Tree extends Component<ITreeProps & RouteComponentProps<{ id: string }, StaticContext, LocationState>, ITreeState & {comment: ""}> {
  static defaultProps = {
    user: null
  }

  private treeId: string | number | null = null;
  private fileIds: number[] = [];
  private canDelete: boolean = false;
  private canEdit: boolean = false;
  private operationInProgress: boolean = false;
  private canApprove: boolean = false;
  private approved: boolean = false;
  private comment: string | undefined;

  constructor(props: ITreeProps & RouteComponentProps<{ id: string }, StaticContext, LocationState >) {
    super(props);
    this.state = {
      tree: null,
      loading: true,
      files: [],
      images: [],
      loadingFiles: true,
      showModal: false,
      modalTitle: '',
      handleClick: undefined,
      isDangerModal: false,
      comment: "",
    }
  }

  convertTree(tree: IJsonTree): ITreeModelConverted {
    const {
      age,
      created,
      diameterOfCrown,
      heightOfTheFirstBranch,
      numberOfTreeTrunks,
      treeHeight,
      species,
      status,
      treePlantingType,
      trunkGirth,
      updated,
      geographicalPoint,
      id,
      pruning,
      rootCondition,
      trunkStates,
      branchStates,
      corticalStates
    } = tree;

    return {
      latitude: {
        title: 'Широта',
        value: geographicalPoint?.latitude?.toFixed(6) ?? null
      },
      longitude: {
        title: 'Долгота',
        value: geographicalPoint?.longitude?.toFixed(6) ?? null
      },
      age: {
        title: 'Возраст (в годах)',
        value: age as number
      },
      diameterOfCrown: {
        title: 'Диаметр кроны (в метрах)',
        value: diameterOfCrown ?? null
      },
      heightOfTheFirstBranch: {
        title: 'Высота первой ветви от земли (в метрах)',
        value: heightOfTheFirstBranch ?? null
      },
      numberOfTreeTrunks: {
        title: 'Число стволов',
        value: numberOfTreeTrunks ?? null
      },
      treeHeight: {
        title: 'Высота (в метрах)',
        value: treeHeight ?? null
      },
      species: {
        title: 'Род/вид дерева',
        value: species?.title ?? null
      },
      status: {
        title: 'Статус дерева',
        value: status ?? null
      },
      treePlantingType: {
        title: 'Тип посадки дерева',
        value: treePlantingType ?? null
      },
      trunkGirth: {
        title: 'Обхват самого толстого ствола (в сантиметрах)',
        value: trunkGirth ?? null
      },

      id: id ?? 0, // FIXME: is it possible to not know tree id
      pruning: {
        title: 'Обрезка',
        value: pruning ?? null,
      },
      rootCondition: {
        title: 'Прикорневые условия',
        value: rootCondition ?? null,
      },
      trunkStates: {
        title: 'Состояние стволов',
        value: trunkStates && trunkStates.length ? trunkStates?.join(', ') : null
      },
      branchStates: {
        title: 'Состояние ветвей',
        value: branchStates && branchStates.length ? branchStates?.join(', ') : null
      },
      corticalStates: {
        title: 'Состояние коры',
        value: corticalStates && corticalStates.length ? corticalStates?.join(', ') : null
      },
      created: {
        title: 'Дата добавления записи',
        value: created ? formatDate(created) : null
      },
      updated: {
        title: 'Дата последнего редактирования',
        value: updated ? formatDate(updated) : null
      },
    }
  }

  componentDidMount() {
    this.treeId = this.props.match.params.id;
    this.comment = "";
    const {location} = this.props;

    if (location.state && location.state.prevPosition) {
      const {latitude, longitude} = location.state.prevPosition;

      this.trySetMaoViewPosition(latitude, longitude);
    }

    if (this.treeId) {
      this.getTree(this.treeId);
      this.getComments(Number(this.treeId));
    }
  }

  getComments = (treeId: number)=>{
    getCommentsTrees(treeId)
      .then(result=>{
        this.setState({comment:result?.[0]?.text});
      })
  }
  getTree = (treeId: string | number) => {
    const {user} = this.props;
    const isModerator = Boolean(user?.roles.includes('superuser') || user?.roles.includes('moderator'));

    getTree(treeId)
      .then((tree: IJsonTree) => {
        this.fileIds = tree.fileIds ?? [];
        this.canDelete = this.checkCanDelete(tree);
        this.canEdit = this.checkCanEdit(tree);

        if (tree.approvedByModerator) {
          const isAuthor = Boolean(user?.id === tree.authorId);

          this.approved = isModerator || isAuthor;
        } else {
          this.canApprove = isModerator
        }

        this.setState({
          tree: this.convertTree(tree),
          loading: false
        }, () => {
          this.getFilesByTree(tree)
        })
      })
      .catch(error => {
        console.error(error, 'Ошибка!');

        if (this.props.user === null) {
          // TODO: redirect to login
          this.props.history.push('/login');
        }

        this.setState({
          loading: false,
          loadingFiles: false
        })
      })
  }

  getFilesByTree = (tree: IJsonTree) => {
    getFilesByTree(tree.fileIds ?? [])
      .then(files => {
        const images = files.filter((file: IFile) => file.mimeType.startsWith('image'));
        const filesWithoutImages = files.filter((file: IFile) => !file.mimeType.startsWith('image'));

        this.setState({
          files: filesWithoutImages,
          images,
          loadingFiles: false
        })
      })
      .catch(error => {
        console.error(error, 'Ошибка при загрузке файлов!');
        this.setState({
          loadingFiles: false
        })
      })
  }

  checkCanDelete(tree: IJsonTree) {
    return tree.deletable ?? false;
  }

  checkCanEdit(tree: IJsonTree) {
    return tree.editable ?? false;
  }

  confirmDeleteCurrentTree = () => {
    this.setState({
      showModal: true,
      modalTitle: 'Вы уверены, что хотите удалить это дерево?',
      handleClick: this.deleteCurrentTree,
      isDangerModal: true
    });
  }

  confirmApproveCurrentTree = () => {
    this.setState({
      showModal: true,
      modalTitle: 'Подтвердить информацию о дереве?',
      handleClick: this.approveCurrentTree,
      isDangerModal: false
    });
  }

  closeModal = () => this.setState({showModal: false});

  trySetMaoViewPosition = (lat: string | number | boolean | null, lng: string | number | boolean | null) => {
    if (lat && lng) {
      const latNum = isNumber(lat) ? lat : parseFloat(lat.toString());
      const lngNum = isNumber(lng) ? lng : parseFloat(lng.toString());

      this.props.setMapViewPosition({lat: latNum, lng: lngNum});
    }
  }

  deleteCurrentTree = () => {
    if (this.treeId && this.canDelete && !this.operationInProgress) {
      this.operationInProgress = true;

      deleteFiles(this.fileIds)
        .then(deletedAllFiles => {
          if (!deletedAllFiles.every(v => v) || !this.treeId) {
            console.error("error while deleting all files");
            return;
          }

          return deleteTree(this.treeId)
        })
        .then(succ => {
          if (succ) {
            if (this.state.tree) {
              const lat = this.state.tree.latitude.value;
              const lng = this.state.tree.longitude.value;

              this.trySetMaoViewPosition(lat, lng);
            }

            this.operationInProgress = false;
            this.setState({showModal: false});
            this.props.history.go(-1);
          } else {
            console.error("error while deleting the tree");
          }
        })
        .catch(() => {
          console.error("error while deleting the tree");
        });
    }
  }

  approveCurrentTree = () => {
    if (this.treeId && this.canApprove && !this.operationInProgress) {
      this.operationInProgress = true;

      approveTree(this.treeId)
        .then(() => {
          this.operationInProgress = false;
          this.setState({showModal: false});

          if (this.treeId) {
            this.getTree(this.treeId);
          }
        }).catch(() => {
        console.error("error while deleting the tree");
      });
    }
  }

  renderModalContent() {
    return (
      <React.Fragment>
        <p>{this.state.modalTitle}</p>
        <div className={modalStyles.buttonContainer}>
          <button className={modalStyles.danger} onClick={this.state.handleClick}>Да</button>
          <button className={modalStyles.success} onClick={this.closeModal}>Нет</button>
        </div>
      </React.Fragment>
    )
  }

  renderEditLink() {
    const {tree} = this.state;

    if (this.canDelete || this.canEdit || this.canApprove || this.approved) {
      return (
        <div className={styles.editLinkWrapper}>
          {this.approved &&
            <div className={styles.approved}>Дерево подтверждено</div>
          }
          {this.canApprove &&
            <div className={styles.approveButton} onClick={this.confirmApproveCurrentTree}>Подтвердить</div>
          }
          <div className={styles.editLinks}>
            {this.canEdit &&
              <Link to={`/trees/${tree?.id}/edit`} className={styles.editLink}>Редактировать</Link>
            }
            {this.canDelete &&
              <div className={styles.removeLink} onClick={this.confirmDeleteCurrentTree}>Удалить</div>
            }
          </div>
        </div>
      )
    }

    return null;
  }

  renderRows() {
    const {tree} = this.state;
    const result: JSX.Element[] = [];
    if (tree == null) {
      return result;
    }
    Object.keys(tree).forEach((key, index) => {
      const treeKey = key as keyof ITreeModelConverted;
      if (treeKey === 'id') {
        return;
      }
      if (tree[treeKey].value) {
        result.push(
          <div key={index} className={styles.row}>
            <div className={styles.col}>
              {tree[treeKey].title}
            </div>
            <div className={styles.col}>
              {tree[treeKey].value}
            </div>
          </div>
        )
      }
    });

    return result;
  }

  renderTable() {
    return (
      <>
        <div className={styles.tbody}>
          {this.renderRows()}
        </div>
        <div className={styles.col}>
          {this.state.comment &&
            <>
              <div className={styles.comment}>Примечание: </div>
              <span  className={styles.comment}style={{overflowWrap:"anywhere"}}>
                {this.state.comment}
              </span>
            </>
          }
        </div>
      </>
    )
  }

  renderDetails() {
    return (
      <div className={styles.wrapper}>
        <h3 className={styles.title}>Основная информация</h3>
        {this.renderTable()}
      </div>
    )
  }

  renderFiles() {
    const {files, loadingFiles} = this.state;

    if (loadingFiles) {
      return <Spinner/>;
    }

    if (files.length) {
      return (
        <div className={styles.wrapper}>
          <h3 className={styles.title}>Файлы</h3>
          <FileUpload mode="read" files={files}/>
        </div>
      )
    }

    return null;
  }

  renderImages() {
    const {images, loadingFiles} = this.state;

    if (loadingFiles) {
      return <Spinner/>;
    }

    if (images.length) {
      return (
        <div className={styles.wrapper}>
          <h3 className={styles.title}>Фотографии</h3>
          <FileUpload
            mode="read"
            type="image"
            files={images}
          />
        </div>
      )
    }

    return null;
  }

  renderContent() {
    const {loading} = this.state;

    if (loading) {
      return <Spinner/>;
    }

    if (!this.state.tree) {
      return (
        <div className={styles.container}>
          <h3 className={styles.title}>Дерево не найдено</h3>
        </div>
      )
    }

    return (
      <React.Fragment>
        <Modal show={this.state.showModal} onClose={this.closeModal} danger={this.state.isDangerModal}>
          {this.renderModalContent()}
        </Modal>
        <PageHeader title={PAGES.tree}/>
        <div className={styles.container}>
          {this.props.user ? this.renderEditLink() : null}
          {this.renderDetails()}
          {this.renderImages()}
          {this.renderFiles()}
        </div>
      </React.Fragment>
    )
  }

  render() {
    return this.renderContent();
  }
}

export default Tree;
