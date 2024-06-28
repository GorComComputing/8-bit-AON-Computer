.PHONY: main
main: *.go deps
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags "-s -w" -trimpath -o 8bitAONgo .


.PHONY:deps
deps:
	#go get github.com/dgrijalva/jwt-go
	#go get github.com/lib/pq

	
