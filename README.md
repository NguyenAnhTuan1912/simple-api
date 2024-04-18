# Modular Structure 002

Đây là cấu trúc module thứ hai, khác với cấu trúc đầu tiên thì cấu trúc này sẽ làm tinh gọn đi nhiều thứ, áp dụng hướng đối tượng nhiều hơn nữa (hầu như là toàn bộ). Giống với cấu trúc đầu tiên thì cấu trúc này cũng áp dụng `Builder` và hơi có `Singleton` Pattern, tương lai có thể áp dụng thêm nhiều Pattern nữa.

## Structure
Cấu trúc của dự án này sẽ bao gồm các folder gồm file `index.ts` để làm file export tổng theo cấu trúc module. Tuy nhiên thì cốt lõi của tính module là ở `modules`, nơi sẽ thực hiện các nhiệm vụ chính trong app, các modules này chứa các handlers và các handlers này sẽ phụ thuộc vào một số configurations khác trong app để thực hiện các hành động đó.

__Chú thích__:
- `databases`: folder này dùng để chứa các configs của MongoDB. Với mỗi folder sẽ là một DB, trong mỗi db sẽ có folder `models`, folder này sẽ define một số operations để thao tác với cơ sỡ dữ liệu (output), cũng như là với các dữ liệu vào (input). 
- `services`: là các service từ bên ngoài, có thể kể đến như là google, cloudinary. Ngoài ra cũng có thể chứa các service nội bộ.
- `controllers`: phần này sẽ là nơi xử lý chính các yêu cầu từ client, nó sẽ dùng db, service, utils và có thể là các thành phần khác để xử lý yêu cầu đó.
- `middlewares`: là các phần mà trong đó nó sẽ tiền xử lý trước các yêu cầu từ người dùng, nói đúng hơn là xử lý trước khi vào tới controllers.
- `modules`: folder này chứa các module để thực hiện yêu cầu từ client, tổng hợp lại các controllers, setup các middlewares và sau đó là export ra các endpoints.
- `types`: chứa type trong project.
- `utils`: các hàm helpers.
- `constants.ts`: là file chứa các dữ liệu hằng trong app (cái này có thể xem xét bỏ qua).
- `settings.ts`: là file chứa các thông tin dùng để startup server.
- `MyServer.ts`: là lớp đối tượng dùng instance của `ServerBuilder` để tạo ra một instance server.
- `ServerBuilder.ts`: là lớp đối tượng dùng để gòm các thuộc tính lại và build ra một instance server.
- `index.ts`: file này dùng để set-up, config server và chạy!!!

### Folder Structure
```
.
└── src/
    ├── databases/
    │   └── mongodb/
    │       ├── models/
    │       │   └── book/
    │       │       └── index.ts
    │       ├── utils/
    │       │   └── index.ts
    │       ├── types.ts
    │       └── index.ts
    ├── services/
    │   └── gapis/
    │       ├── types.ts
    │       └── index.ts
    ├── controllers/
    │   └── book/
    │       ├── types.ts
    │       └── index.ts
    ├── middlewares/
    │   ├── auth/
    │   │   └── index.ts
    │   └── index.ts
    ├── modules/
    │   └── book/
    │       └── index.ts
    ├── utils/
    │   ├── string/
    │   │   └── index.ts
    │   ├── number/
    │   │   └── index.ts
    │   └── inxex.ts
    ├── types/
    │   └── index.ts
    ├── constants.ts
    ├── settings.ts
    ├── MyServer.ts
    ├── ServerBuilder.ts
    └── index.ts
```

### System Architecture*
![image](https://github.com/NguyenAnhTuan1912/node-project-structures/assets/86825061/bd22a26f-dec6-42b9-9dfe-933a9473d1f6)

Khác với `Modules 001`, thì `Modules 002` sẽ dùng OOP hầu hết (hoặc hoàn toàn) để phát triển ứng dụng. Đồng thời giảm bớt các layer setup (đại loại là nó là một function nhận các tham số, sau đó là trả về kết quả. Ví dụ như các `templates`), để cho quá trình bảo trì dễ dàng hơn, tránh làm rối mã nguồn. Các components trong `Modules 002` này nó rõ ràng hơn, đồng thời mỗi component đều có một instance đại diện cho nó.

Với mỗi component thì nó sẽ (hoặc không) là wrapper để implement một số operations, ví dụ:

Mình lưu một đối tượng trong mongo, mà mongo thì có hàm lấy nhiều dữ liệu là `find` hoặc là `aggregate` (hai thằng này phải có setup khác biệt), nhưng trong mysql thì nó phải dùng một query string để làm điều đó. Điều này lại khiến cho việc sử dụng cơ sở dữ liệu rối rắm hơn một tí nếu như trong app mình đang xử dụng nhiều cơ sở dữ liệu cùng lúc. Vậy để cho dễ phát triển hơn thì việc mình cần làm là phải chuẩn hóa nó bằng cách wrap một function ở bên ngoài, dùng các thông tin thêm để implement operation đó, từ đó thì khi tìm nhiều record trong mongo hay mysql thì sẽ chỉ còn là `DB.Object.queryRecord`.

Hay một ví dụ khác nữa là với service, trong ứng dụng cần lưu dữ liệu, mình có 2 phương án là lưu ở google hoặc là lưu ở aws hoặc là cả 2. Trong trường hợp lưu ở google trước như trong tương lai thì có thể thay đổi sang aws, thì sẽ rất bất tiện nếu như mình phải thay đổi tên của method lẫn tên của service và một số thuộc tính khác để có thể làm phù hợp service mới. Giống với trường hợp trên thì mình cũng phải wrap nó lại và dùng một số thuộc tính.

Từ 2 ví dụ trên thì việc implement OOP là hợp lý.

## Pros and Cons
Vẫn đang trong quá trình phát triển và tìm hiểu cấu trúc này, cho nên là vẫn chưa nhận thấy nhiều điểm tiện/bất tiện.
### Props
- Có các lợi ích của M001.
- Dễ dàng thay đổi, bảo trì hơn.

### Cons
- Để dùng rồi đánh giá.
